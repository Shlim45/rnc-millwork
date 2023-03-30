import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
// import { supabase } from "@/utils/supabaseClient";
import ProjectsPanel from './ProjectsPanel';
import styles from '@/styles/Admin.module.css'

export default function AdminPanel({ session }) {
    const supabase = useSupabaseClient();
    // const user = useUser();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState(null);

    async function createProject(title) {
        try {
            const values = {
                title,
                updated_at: new Date().toISOString(),
            }

            let { data, error } = await supabase.from('projects').insert(values).select();
            if (error) throw error;
            setProjects(currentProjects => [...currentProjects, data[0]]);
            alert('Project created!');
        } catch (error) {
            alert('Error creating the project!');
            console.log(error);
        }
    }

    async function fetchProjects() {
        try {
            setLoading(true);
            setProjects(null);

            let { data, error, status } = await supabase
                .from('projects')
                .select('*');

            if (error && status !== 406) {
                throw error;
            }

            setProjects(data);

        } catch (error) {
            alert('Error loading projects!');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    async function handleNewProject() {
        const title = prompt('Enter a short title for this project.');
        if (title?.length > 0) {
            await createProject(title);
        }
    }

    // TODO(jon): NEXT BUILD complains about not including fetchProjects
    // in the dependency array, but not passing empty dependency array
    // causes fetching/rendering loop.

    // Fix by defining fetchProjects within useEffect?
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className={styles.container}>
            <h1>Admin Panel</h1>

            <button onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>

            <button onClick={handleNewProject}>New Project</button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ProjectsPanel projects={projects} />
            )}

        </section >
    );
}