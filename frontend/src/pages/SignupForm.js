import React, { useState } from 'react';
import AuthService from '../AuthService';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ROLE_STUDENT' // Keep as single value for form handling
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsSubmitting(true);
        
        try {
            await AuthService.signup(
                formData.username, 
                formData.email, 
                formData.password, 
                formData.role
            );
            navigate('/login');
        } catch (error) {
            // Improved error handling
            if (error.response) {
                // Backend validation errors
                if (error.response.data) {
                    setErrorMessage(
                        typeof error.response.data === 'string' 
                            ? error.response.data
                            : JSON.stringify(error.response.data)
                    );
                } else {
                    setErrorMessage('Registration failed. Please try again.');
                }
            } else {
                setErrorMessage('Network error. Please check your connection.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username (3-20 characters)</label>
                    <input 
                        type="text" 
                        name="username"
                        value={formData.username} 
                        onChange={handleChange}
                        required
                        minLength="3"
                        maxLength="20"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleChange}
                        required
                        maxLength="50"
                    />
                </div>
                <div className="form-group">
                    <label>Password (6-40 characters)</label>
                    <input 
                        type="password" 
                        name="password"
                        value={formData.password} 
                        onChange={handleChange}
                        required
                        minLength="6"
                        maxLength="40"
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select 
                        name="role"
                        value={formData.role} 
                        onChange={handleChange}
                    >
                        <option value="ROLE_STUDENT">Student</option>
                        <option value="ROLE_PROFESSOR">Professor</option>
                        <option value="ROLE_ADMIN">Admin</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                {errorMessage && (
                    <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
                        {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Signup;