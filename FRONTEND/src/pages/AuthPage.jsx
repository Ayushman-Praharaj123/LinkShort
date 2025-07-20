import { useState } from 'react'
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
  };

  const handleRegisterSuccess = (response) => {
    console.log('Registration successful:', response);
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        {isLogin ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>
    </div>
  )
}

export default AuthPage
