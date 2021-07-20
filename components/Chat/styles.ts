import { createStyles, Theme } from '@material-ui/core'

const styles = (theme: Theme) =>
	createStyles({
		chatContainer: {
			width: '100%',
			height: '100%',
			maxHeight: 450,
			maxWidth: 450,
		},
		feed: {
			flex: 1,
			width: '100%',
			padding: 8,
		},
		paperRoot: {
			height: '100%',
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		msgUser: {
			fontSize: 14,
		},
		msg: {
			fontSize: 16,
		},
	})

export default styles
