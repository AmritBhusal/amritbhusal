'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = 'password';
const AUTH_KEY = 'portfolio_admin_auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(AUTH_KEY);
        if (token === 'authenticated') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (email: string, password: string): boolean => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem(AUTH_KEY, 'authenticated');
            document.cookie = `${AUTH_KEY}=authenticated; path=/; max-age=86400`;
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        document.cookie = `${AUTH_KEY}=; path=/; max-age=0`;
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
