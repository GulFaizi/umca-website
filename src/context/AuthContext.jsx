import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('umca_auth_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Failed to load user from localStorage", e);
            return null;
        }
    });

    const login = (usernameOrEmail, password) => {
        const query = usernameOrEmail.trim().toLowerCase();
        const found = usersData.find(u =>
            (u.username.toLowerCase() === query || u.email.toLowerCase() === query) &&
            u.password === password
        );

        if (found) {
            const safeUser = {
                id: found.id,
                username: found.username,
                name: found.name,
                email: found.email,
                role: found.role,
                avatar: found.avatar || '👤'
            };
            setUser(safeUser);
            localStorage.setItem('umca_auth_user', JSON.stringify(safeUser));
            return { success: true, user: safeUser };
        } else {
            return { success: false, error: 'Invalid credentials. Please check your username and password.' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('umca_auth_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
