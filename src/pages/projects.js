import Head from 'next/head'
import { server } from "@/config"
import ProjectList from '@/components/ProjectList';

export default function Projects({projects}) {
  return (
    <>
      <Head>
        <title>RnC Custom Woodworking</title>
        <meta name="description" content="Custom woodworking shop" />
        <meta name="keywords" content="woodworking, custom wood, table, desk, cabinet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Projects</h1>
      <hr />
      <ProjectList projects={projects} />
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/projects`)

  const projects = await res.json();

  return {
      props: {
          projects
      }
  }
}