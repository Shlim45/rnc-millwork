import Layout from '../components/Layout'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient())

    return (
        <Layout>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <Component {...pageProps} />
            </SessionContextProvider>
        </Layout>
    )
}
