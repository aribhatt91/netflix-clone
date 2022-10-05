import { useState, useEffect, createContext, useContext, useMemo } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'


interface AuthProviderProps {
    children: React.ReactNode | React.ReactElement
}

interface IAuth {
    user: User | null
    signUp: ( email: string, password: string ) => Promise<void>
    signIn: ( email: string, password: string ) => Promise<void>
    logOut: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState<any | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ initialLoading, setInitialLoading ] = useState<boolean>(false);
    const router = useRouter();

    /* Persistent login state */
    useEffect(() => 
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
                //setLoading(false);
                if(router.pathname === '/login') {
                    router.push('/');
                }
            }else {
                setUser(null);
                //setLoading(false);
                router.push('/login');
            }
            setInitialLoading(false)
        })
    , [auth])

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try{
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCred.user);
            router.push('/');
        }catch(error: any){
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try{
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCred.user);
            router.push('/');
        }catch(error: any){
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }

    const logOut = async () => {
        setLoading(true);
        setError(null);
        try{
            await signOut(auth);
            setUser(null);
        }catch(error: any){
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }

    const value = useMemo(() => {
        return {
            user,
            signUp,
            signIn,
            logOut,
            error,
            loading
        }
    }, [user, loading, error])

    return <AuthContext.Provider value={value}>
        {!initialLoading && children}
    </AuthContext.Provider>

}

export default AuthProvider;