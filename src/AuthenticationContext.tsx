import { useState, createContext, useEffect, ReactNode, useContext } from 'react';

import { firebase, auth } from './services/firebase';


type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthenticationContextType = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthenticationContext({ children }: AuthenticationContextType) {
  const [ user, setUser ] = useState<User>();

  useEffect(()=> {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { uid, displayName, photoURL } = user;
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });
  }, []);

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
  
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }
  
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
      }
    }; 
  
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthentication = () => {
  return (useContext(AuthContext));
};

