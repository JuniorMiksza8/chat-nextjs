import styles from './../styles/home.module.css'
import Chat from '../components/Chat'
import ProfileProvider, { ProfileContext } from '../context/ProfileContext'
import ProfileForm from '../components/ProfileForm'

export default function Home() {
	return (
		<ProfileProvider>
			<ProfileContext.Consumer>
				{({ profile }) => (
					<div className={styles.container}>
						{profile ? <Chat /> : <ProfileForm />}
					</div>
				)}
			</ProfileContext.Consumer>
		</ProfileProvider>
	)
}
