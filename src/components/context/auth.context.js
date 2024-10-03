import {
  createContext,
  useState
} from 'react';

export const AuthContext = createContext( {
  isAuthenticated: false,
  user: {
    id: null,
    name: '',
    username: '',
    email: '',
    role: '',
    avata: ''
  }
});

export const AuthWrapper = (props) => {
  const [auth,
    setAuth] = useState( {
      isAuthenticated: false,
      user: {
        id: null,
        name: '',
        username: '',
        email: '',
        role: '',
        image: ''
      }
    })
  return(
    <AuthContext.Provider value={ {
      auth,
      setAuth
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}