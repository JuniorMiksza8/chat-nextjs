import {
	Paper,
	TextField,
	withStyles,
	Typography,
	Chip,
} from '@material-ui/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import styles from './styles'

import { ProfileContext } from '../../context/ProfileContext'
import IMessage from '../../interfaces/IMessage'
import IProfile from '../../interfaces/IProfile'

type IProps = {
	classes: any
}

type IConnectionProps = {
	user: IProfile
}

function Chat(props: IProps) {
	const { classes } = props

	const { profile, setProfile } = useContext(ProfileContext)
	const [messages, setMessages] = useState<IMessage[]>([])

	const socket = useRef<Socket | undefined>()

	const messageFactory = (message: string): IMessage => {
		return {
			message,
			user: profile!,
		}
	}

	const updatedMessages = (message: IMessage) => {
		setMessages((messages) => [...messages, message])
	}

	useEffect(() => {
		socket.current = io('localhost:3001', {
			transports: ['websocket'],
			reconnectionAttempts: 3,
			query: { username: profile!.username, color: profile!.color },
		})

		socket.current.on('connection', ({ user }: IConnectionProps) => {
			setProfile({ ...profile!, id: user.id })
		})

		socket.current.on('message', updatedMessages)

		socket.current.on('roomRefresh', (data) => {
			console.log(data)
		})

		return () => {
			socket.current?.disconnect()
		}
	}, [])

	const onSubmit = (values: { message: string }, { resetForm }: any) => {
		const built = messageFactory(values.message)
		socket.current?.emit('message', built)
		resetForm()
	}

	return (
		<div className={classes.chatContainer}>
			<Paper elevation={2} classes={{ root: classes.paperRoot }}>
				<div className={classes.feed}>
					{messages.map((message: IMessage, index) => (
						<React.Fragment key={index}>
							<Typography
								className={classes.msgUser}
								style={{ color: message.user.color }}
							>
								{message.user.username}
							</Typography>
							<Chip
								label={message.message}
								className={classes.msg}
								style={{ color: message.user.color }}
							/>
						</React.Fragment>
					))}
				</div>
				<Formik initialValues={{ message: '' }} onSubmit={onSubmit}>
					<Form>
						<Field
							name="message"
							as={TextField}
							variant="outlined"
							fullWidth
						/>
					</Form>
				</Formik>
			</Paper>
		</div>
	)
}

export default withStyles(styles)(Chat)
