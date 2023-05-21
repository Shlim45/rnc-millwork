import Layout from '../components/Layout'
import '@/styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Analytics } from '@vercel/analytics/react'
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
                        description: 'RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services.  Our products are proudly 100% Made in America and we use locally sourced and hand-selected lumber to deliver beautiful hand-crafted wooden furniture to our customers for a competitive price.',
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
                <Analytics />
            </SessionContextProvider>
        </Layout>
    )
}
