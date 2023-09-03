import SandBox from '@/components/SandBox';
import ProjectList from '@/components/ProjectList';
import { supabase } from '@/utils/supabaseClient';
import { NextSeo } from 'next-seo';

export default function Projects({ projects }) {
    return (
        <>
            <NextSeo
                title="RC Custom Millworks of Pittsburgh - Projects"
                description="RC Custom Millworks is a woodworking company located in Castle Shannon just off Library Road.  We specialize in creating custom cabinetry, tables, banisters, mantelpieces, desks, countertops, built-in entertainment centers, bars and more.  Our team of skilled craftsmen has years of experience and is dedicated to providing the highest quality products and services."
                canonical="https://www.rccustommillworks.com/projects/"
                additionalMetaTags={[
                    {
                        property: 'keywords',
                        content: 'rc custom millworks, rc custom millwork, millworks, rc millwork, rcm, millwork, mill work, kitchen remodel, kitchen renovation, woodworking, custom wood, furniture, kitchen cabinets, custom cabinets, custom kitchen cabinets, table, desk, cabinet, entertainment center, built in, built-in, vanity, vanities, banister, mantelpiece, countertop, counter-top, bar, wet bar, kitchenette, hand-made, hand made, pittsburgh, south hills, north hills, allegheny county, RC Custom Millworks of Pittsburgh, wood shop, quality, pennsylvania'
                    }
                ]}

            />

            <SandBox heading="Projects">
                <ProjectList projects={projects} />
            </SandBox>
        </>
    )
}

export const getStaticProps = async () => {
    let { data } = await supabase.from('projects').select('*').eq('hidden', false);

    return {
        props: {
            projects: data
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}