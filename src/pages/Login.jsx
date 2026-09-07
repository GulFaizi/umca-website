import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaSignInAlt, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Login.scss';

const Login = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username.trim() || !password) {
            setError('Please enter both username/email and password.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const res = login(username, password);
            setLoading(false);
            if (res.success) {
                navigate('/news');
            } else {
                setError(res.error);
            }
        }, 300);
    };

    if (user) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-card already-logged-in">
                        <div className="logged-in-icon">
                            <FaCheckCircle />
                        </div>
                        <h2>Already Signed In</h2>
                        <p className="logged-in-user">
                            You are signed in as <strong>{user.name}</strong> ({user.role})
                        </p>
                        <div className="logged-in-actions">
                            <button
                                className="button primary"
                                onClick={() => navigate('/news')}
                            >
                                Go to News Management
                            </button>
                            <button
                                className="button outline"
                                onClick={logout}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <Link to="/news" className="login-back-link">
                    <FaArrowLeft /> Back to News
                </Link>

                <div className="login-card">
                    <div className="login-header">
                        <img src={logo} alt="UMCA Logo" className="login-logo" />
                        <h1 className="login-title">Staff & Contributor Login</h1>
                        <p className="login-subtitle">
                            Sign in to manage field articles, announcements, and news updates.
                        </p>
                    </div>

                    {error && (
                        <div className="login-error-alert" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username or Email</label>
                            <div className="input-wrapper">
                                <FaUser className="input-icon" />
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Enter User ID"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <FaLock className="input-icon" />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="button primary login-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                'Signing In...'
                            ) : (
                                <>
                                    <FaSignInAlt className="btn-icon" /> Sign In
                                </>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
