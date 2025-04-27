import {create} from 'zustand'

const useAuthStore = create((set) => ({
    isAuth:localStorage.getItem('isAuth') === 'true',
    setAuth:(authStatus) => {
        set({isAuth:authStatus});
        localStorage.setItem('isAuth',authStatus)
    }
}))


export default useAuthStore