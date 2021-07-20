import {
	Paper,
	TextField,
	withStyles,
	Typography,
	Input,
	Button,
	Container,
	Grid,
	Box,
	FormControl,
	InputLabel,
} from '@material-ui/core'
import { Field, FieldProps, Form, Formik, FormikHelpers } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProfileContext } from '../../context/ProfileContext'
import IProfile from '../../interfaces/IProfile'
import TextFormField from '../TextFormField'
import styles from './styles'
import * as yup from 'yup'

type Props = {
	classes: any
}

function ProfileForm(props: Props) {
	const { classes } = props
	const { profile, setProfile } = useContext(ProfileContext)

	const onSubmit = (data: IProfile) => {
		setProfile(data)
	}

	const validationSchema = yup.object({
		username: yup.string().required('Nome de usuario obrigatorio'),
		color: yup.string().required(),
	})

	return (
		<Paper>
			<Box p={3}>
				<Formik
					initialValues={{
						username: '',
						color: '#000',
						id: '',
						...profile,
					}}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					<Form>
						<React.Fragment>
							<Typography color="textSecondary">
								Preencha os campos e entre na sala de bate-papo
								a
							</Typography>
							<Box mt={3}>
								<Field
									variant="outlined"
									label="Nome de usuario"
									fullWidth
									component={TextFormField}
									name="username"
								/>
							</Box>
							<Box mt={3}>
								<Field name="color">
									{({ field }: FieldProps) => (
										<FormControl
											fullWidth
											variant="outlined"
										>
											<InputLabel>Cor</InputLabel>
											<Input type="color" {...field} />
										</FormControl>
									)}
								</Field>
							</Box>
							<Box mt={3}>
								<Grid container justifyContent="center">
									<Grid item lg={6} md={12} sm={12} xl={6}>
										<Button
											fullWidth
											type="submit"
											variant="contained"
											color="primary"
										>
											Entrar
										</Button>
									</Grid>
								</Grid>
							</Box>
						</React.Fragment>
					</Form>
				</Formik>
			</Box>
		</Paper>
	)
}

export default withStyles(styles)(ProfileForm)
