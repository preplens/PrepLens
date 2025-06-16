import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // For demo purposes, we'll set a mock user
      // In a real app, you would validate the token with your backend
      dispatch(
        loginSuccess({
          user: {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            role: 'student',
          },
          token,
        })
      );
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer; 