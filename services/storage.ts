import IProfile from '../interfaces/IProfile'

export function getStoragedProfile(): IProfile | undefined {
    const storaged = localStorage.getItem('profile')
    if (storaged) {
        return JSON.parse(storaged)
    } else {
        return undefined
    }
}

export function storeProfile(profile: IProfile): void {
    localStorage.setItem('profile', JSON.stringify(profile))
}
