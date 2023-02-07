import { useSession } from '@supabase/auth-helpers-react'
import LoginForm from '@/components/LoginForm';
import AdminPanel from '@/components/AdminPanel'

const Admin = () => {
    const session = useSession();

    return !session ? (
        <LoginForm />
    ) : (
        <AdminPanel session={session} />
    )
}

export default Admin