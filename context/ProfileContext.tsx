import React, { createContext, useEffect, useState } from 'react'
import IProfile from '../interfaces/IProfile'
import { getStoragedProfile, storeProfile } from '../services/storage'

interface IProfileContextState {
	profile: undefined | IProfile
}

interface IProfileContextData extends IProfileContextState {
	setProfile: (profile: IProfile) => void
}

export const ProfileContext = createContext({} as IProfileContextData)

function ProfileProvider({ children }: any) {
	const [profile, setProfile] = useState<undefined | IProfile>(undefined)

	useEffect(() => {
		const cached = getStoragedProfile()
		if (cached) {
			setProfile(cached)
		}
	}, [])

	const setAndCacheProfile = (profile: IProfile) => {
		storeProfile(profile)
		setProfile(profile)
	}

	return (
		<ProfileContext.Provider
			value={{ profile, setProfile: setAndCacheProfile }}
		>
			{children}
		</ProfileContext.Provider>
	)
}

export default ProfileProvider
