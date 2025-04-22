// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { SignupRequest } from '../types/auth';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [signupData, setSignupData] = useState<SignupRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await register(signupData);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Créer un compte</h2>
        <p className="register-subtitle">Rejoins la plateforme ClassCraft</p>

        {error && <div className="register-error">{error}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            required
            value={signupData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            required
            value={signupData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Adresse Email"
            required
            value={signupData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            value={signupData.password}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Numéro de téléphone"
            required
            value={signupData.phone}
            onChange={handleChange}
          />

          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? 'Inscription...' : 'S’inscrire'}
          </button>
        </form>

        <p className="login-text">
          Déjà inscrit ? <a href="/login">Connectez-vous</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
