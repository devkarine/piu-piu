import {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
  } from 'react'
  import {  LoginProps, User } from '../../types/Users'
  import { useNavigate } from 'react-router-dom'
  import { login } from '../../service/index'


  
  interface IAuthContext {
    user?: User
    setUser: (user: User) => void
    signIn: (credentials: LoginProps) => Promise<void>
    signOut: () => void
    isAuthenticated: boolean
  }
  
  const AuthContext = createContext({} as IAuthContext)
  
  interface IAuthProvider {
    children: ReactNode
  }
  
  export function AuthProvider({ children }: IAuthProvider) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<User>()
    const navigate = useNavigate()
  
    async function signIn({ handle, password }: LoginProps) {
        console.log('teste context')
        
      try {
        const response = await login({
          handle,
          password,
        })
  
        if (response.token) {
          navigate('/home')
          localStorage.setItem('token', response.token)
         localStorage.setItem('user', JSON.stringify(response.user))
          setIsAuthenticated(true)

        }
        
        
      } catch (error) {
        throw new Error(error as string)
      }

      
    }
  
     function signOut() {
      localStorage.clear()
  
      navigate('/')
  
      setIsAuthenticated(false)
    }
  
    useEffect(() => {
      const token = localStorage.getItem('token')
      const authUser = localStorage.getItem('user')

      
      if (!token) {
        setIsAuthenticated(false)
        return
      }
      
        
        if(authUser){
          setUser(JSON.parse(authUser))
        }
      setIsAuthenticated(true)
    }, [])
  
    return (
      <AuthContext.Provider
        value={{
          signIn,
          signOut,
          isAuthenticated,
          user,
          setUser
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }
  
  export const useAuth = () => {
    const context = useContext(AuthContext)
  
    if (!context) {
      throw new Error(
        'Você somente pode usar este hook debaixo de um <AuthContextProvider>'
      )
    }
  
    return context
  }