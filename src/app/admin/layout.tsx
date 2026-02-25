import { AuthProvider } from '@/components/Admin/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
