import { createContext, useState, useEffect } from 'react';
import { projectFirestore, projectAuth } from '../fbConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (firstName, lastName, companyName, displayName, email, password) => {
    try {
        const res = await  projectAuth.createUserWithEmailAndPassword(email, password);
      console.log('Signed User Up', res.user)
       // add display name to user
    await res.user.updateProfile({ displayName: displayName })
   
    await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        email,
        courses:[],
        companyName,
        firstName:firstName,
        lastName:lastName,
        address:"",
        userPermissionLevel: null
    })
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await projectAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await projectAuth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await projectAuth.sendPasswordResetEmail(email);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
