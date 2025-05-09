import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginRequest } from '../../types/auth';
import { useAuth } from '../../context/AuthContext'; // ✅ use the context
import '../../styles/Login.css';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login, user } = useAuth(); // ✅ grab login from AuthContext

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(loginData.email, loginData.password); // ✅ use context login

      // Navigate based on role (read from localStorage or context)
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

      if (storedUser.role !== "ROLE_ADMIN") {
        navigate('/dashboard');
      } else {
        navigate('/admin');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Connexion à ClassCraft</h2>
        <p className="login-subtitle">Veuillez entrer vos identifiants</p>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Adresse Email"
            required
            value={loginData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            value={loginData.password}
            onChange={handleChange}
          />

          <div className="login-options">
            <span
              className="forgot-password"
              onClick={() =>
                alert("Veuillez contacter l'administrateur pour réinitialiser votre mot de passe.")
              }
            >
              Mot de passe oublié ?
            </span>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="signup-text">
          Pas de compte ? <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
