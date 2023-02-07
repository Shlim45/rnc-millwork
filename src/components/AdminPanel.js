import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import ProjectsPanel from './ProjectsPanel';
import styles from '@/styles/Admin.module.css'

export default function AdminPanel({ session }) {
    const supabase = useSupabaseClient();
    // const user = useUser();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState(null);

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

    // TODO(jon): NEXT BUILD complains about not including fetchProjects
    // in the dependency array, but not passing empty dependency array
    // causes fetching/rendering loop.  Fix.
    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className={styles.container}>
            <h1>Admin Panel</h1>

            <button onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ProjectsPanel projects={projects} />
            )}

        </section >
    );
}