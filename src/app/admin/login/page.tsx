'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FolderKanban, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '@/components/Admin/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(res => setTimeout(res, 500));

        const success = login(email, password);
        if (success) {
            const from = searchParams.get('from') || '/admin';
            router.push(from);
        } else {
            setError('Invalid email or password');
            setIsLoading(false);
        }
    };

    return (
        <div className="border border-[#30363d] rounded-xl bg-[#161b22] overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {error && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#f85149]/10 border border-[#f85149]/20 rounded-lg text-sm text-[#f85149]">
                        <AlertCircle size={16} className="flex-shrink-0" />
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#e6edf3]">Email address</label>
                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#484f58]" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@admin.com"
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#e6edf3]">Password</label>
                    <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#484f58]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-10 pr-11 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-[#e6edf3] text-sm placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/20 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#8b949e] transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 bg-[#238636] hover:bg-[#2ea043] disabled:bg-[#238636]/50 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#238636]/20 disabled:shadow-none flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        'Sign in'
                    )}
                </button>
            </form>
        </div>
    );
};

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#238636] to-[#2ea043] mb-4 shadow-lg shadow-[#238636]/20">
                        <FolderKanban size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-[#e6edf3]">Portfolio Admin</h1>
                    <p className="text-sm text-[#8b949e] mt-1">Sign in to manage your projects</p>
                </div>

                <Suspense fallback={
                    <div className="border border-[#30363d] rounded-xl bg-[#161b22] p-6 text-center text-[#8b949e] text-sm">
                        Loading...
                    </div>
                }>
                    <LoginForm />
                </Suspense>

                <p className="text-center text-xs text-[#484f58] mt-6">
                    Protected admin area • Portfolio Management
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
