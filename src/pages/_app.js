import Layout from '../components/Layout'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }) {
    const [supabase] = useState(() => createBrowserSupabaseClient())

    return (
        <Layout>
            <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
                <DefaultSeo
                    defaultTitle='RC Custom Millworks of Pittsburgh'
                    openGraph={{
                        type: 'website',
                        locale: 'en_IE',
                        url: 'https://www.rccustommillworks.com/',
                        siteName: 'RC Custom Millworks of Pittsburgh',
                        title: 'Handmade Custom Woodworking',
                        description: 'Custom woodworking millwork shop located near Pittsburgh, PA that creates beautiful hand-crafted custom wooden furniture, cabinetry, desks and more.',
                        images: [
                            {
                                url: 'https://res.cloudinary.com/dsnkbgfrm/image/upload/rcm_logo_horizontal.svg',
                                width: 400,
                                height: 200,
                                alt: 'RC Custom Millworks logo'
                            },
                        ],
                    }}
                />
                <Component {...pageProps} />
            </SessionContextProvider>
        </Layout>
    )
}
