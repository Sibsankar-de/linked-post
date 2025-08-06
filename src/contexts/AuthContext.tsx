import { useState, useEffect, createContext } from 'react'
import axios from '../configs/axios-configs';
import { DotSpinner } from '../components/LoadingSpinner/DotSpinner';

interface AuthContextType {
    user: Record<string, any> | null;
    setUser: (user: Record<string, any> | null) => void;
    isAuthenticated: boolean | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Record<string, any> | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    // fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await axios.get('/user/current-user')
                    .then((res) => {
                        setUser(res.data.data)
                        setIsAuthenticated(true);
                    })
            } catch (error) {
                console.error(error);
                setIsAuthenticated(false);
            }
        }
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
            {isAuthenticated === null ?
                <LoadingComp />
                : children
            }
        </AuthContext.Provider>
    )
}

const LoadingComp = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center' >
            <div >
                <DotSpinner width={50} />
                <span>Loading...</span>
            </div>
        </div>
    )
}

export default AuthContext;
