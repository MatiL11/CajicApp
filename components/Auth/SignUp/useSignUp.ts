import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const useSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enterpriseName, setEnterpriseName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Recibe el tipo de cuenta como argumento
  const handleSignUp = async (accountType: 'vendedor' | 'comprador') => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda los datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        enterpriseName,
        contactNumber,
        accountType, // Aquí guardas el tipo de cuenta
        createdAt: new Date()
      });

      setSuccess(true); // Cuenta creada con éxito!
      // Limpiar campos
      setEmail('');
      setPassword('');
      setEnterpriseName('');
      setContactNumber('');
      
    } catch (err: any) {
      setError('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    enterpriseName,
    setEnterpriseName,
    contactNumber,
    setContactNumber,
    error,
    loading,
    success,
    handleSignUp,
  };
};

export default useSignUp;