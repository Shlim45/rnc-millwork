import Head from 'next/head'
import { projects } from "@/data"
import ProjectList from '@/components/ProjectList';

export default function Projects({ projects }) {
  return (
    <>
      <Head>
        <title>RC Millwork of Pittsburgh</title>
        <meta name="description" content="Custom woodworking millwork shop located near Pittsburgh, PA" />
        <meta name="keywords" content="rc millwork, rcm, millwork, mill work, woodworking, custom wood, table, desk, cabinet, pittsburgh, millwork, built in, built-in, hand-made, hand made, pittsburgh, south hills, north hills" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Projects</h1>
      <ProjectList projects={projects} />
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      projects
    }
  }
}