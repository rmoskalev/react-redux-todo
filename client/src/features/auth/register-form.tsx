import React, { useState } from 'react';
import { useRegisterUserMutation } from '@entities/profile';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData).unwrap();
      navigate('/todo');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Имя
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Пароль
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mt-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {isError && <div className="mb-4 text-red-500 text-sm">Ошибка регистрации</div>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-indigo-300"
      >
        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
};

export default RegisterForm;
