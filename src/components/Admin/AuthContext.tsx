'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    // Client-side route guard (static export has no server for middleware/proxy)
    useEffect(() => {
        const authed = localStorage.getItem(AUTH_KEY) === 'authenticated';
        setIsAuthenticated(authed);
        setChecked(true);
        if (!authed && pathname !== '/admin/login') {
            router.replace(`/admin/login?from=${encodeURIComponent(pathname)}`);
        }
    }, [pathname, router]);

    // Block protected content until the auth check runs
    if (!checked && pathname !== '/admin/login') return null;
    if (!isAuthenticated && pathname !== '/admin/login') return null;

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
