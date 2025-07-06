import React, { useContext, useState } from 'react'
import { authStyles as styles } from '../assets/dummystyle'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance';
import { Input } from './Input';
import { API_PATHS } from '../utils/apiPaths';

const SignUp = ({setCurrentPage}) => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    console.log(" AXIOS URL",API_PATHS.AUTH.REGISTER)
    console.log("DATA", {fullName, email, password})
    e.preventDefault();
    if(!fullName) {
      setError('Please enter fullName')
      return;
    }
    if (!validateEmail(email) ) {
      setError('please enter a valid email ')
      return;
    }
    if(!password) {
        setError('Please enter password')
        return;
    }
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;
      if(token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    }
    catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>

      {/* form */}
      <form onSubmit={handleSignUp} className={styles.signupForm}>
        <Input value = {fullName} onChange = {({ target }) => setFullName(target.value)}
        label='Full Name'
        placeholder='MEOWATI'
        type='Text' />

         <Input value = {email} onChange = {({ target }) => setEmail(target.value)}
        label='Email'
        placeholder='purr@example.com'
        type='email' />

         <Input value = {password} onChange = {({ target }) => setPassword(target.value)}
        label='password'
        placeholder='Min 8 characters'
        type='password' />

        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type = 'submit' className={styles.signupSubmit}>
          Sign Up
        </button>

        <p className={styles.switchText}>
                  Already Have an Account{' '}
                  <button type='button'
                  onClick= {() => setCurrentPage('login')}
                  className={styles.switchButton}>
                    Log In
                  </button>
                </p>
      </form>
    </div>
  )
}

export default SignUp