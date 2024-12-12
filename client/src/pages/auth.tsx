import { useState } from 'react';

import LoginForm from '@features/auth/login-form';
import RegisterForm from '@features/auth/register-form';


const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isLogin ? 'Вход' : 'Регистрация'}
        </h2>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:text-indigo-700"
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
