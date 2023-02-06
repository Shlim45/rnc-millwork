import { useSession } from '@supabase/auth-helpers-react'
import LoginForm from '@/components/LoginForm';
import AdminPanel from '@/components/AdminPanel'

const Admin = () => {
    const session = useSession();

    return (
        <div>
            {!session ? (
                <LoginForm />
            ) : (
                <AdminPanel session={session} />
            )}
        </div>
    )
}

export default Admin