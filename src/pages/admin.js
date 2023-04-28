import { useSession } from '@supabase/auth-helpers-react'
import { NextSeo } from 'next-seo';
import LoginForm from '@/components/LoginForm';
import AdminPanel from '@/components/AdminPanel'

const Admin = () => {
    const session = useSession();

    return (
        <>
            <NextSeo
                title="Admin | RC Custom Millworks of Pittsburgh"
                description="Custom woodworking millwork shop located near Pittsburgh, PA that creates beautiful hand-crafted custom wooden furniture, cabinetry, desks and more."
                canonical="https://www.rccustommillworks.com/"
                additionalMetaTags={[
                    {
                        property: 'robots',
                        content: 'noindex'
                    }
                ]}

            />
            {!session ? (
                <LoginForm />
            ) : (
                <AdminPanel session={session} />
            )}
        </>)
}

export default Admin