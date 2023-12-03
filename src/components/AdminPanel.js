import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ProjectsPanel from './ProjectsPanel';
import MessageBox from './MessageBox'
import styles from '@/styles/Admin.module.css'


export default function AdminPanel({ session }) {
    const supabase = useSupabaseClient();
    // const user = useUser();
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState(null);
    const [categories, setCategories] = useState(null);
    const [message, setMessage] = useState(null);

    async function createProject(title) {
        try {
            setMessage(null);
            setLoading(true);

            const values = {
                title,
                updated_at: new Date().toISOString(),
            }

            let { data, error } = await supabase.from('projects').insert(values).select();
            if (error) throw error;
            setProjects(currentProjects => [data[0], ...currentProjects]);
        } catch (error) {
            setMessage({
                message: `Error creating the project!\n${error.message}`,
                success: false,
            });
        }
        finally {
            setLoading(false);
            setMessage({
                message: `Successfully created project '${title}'.`,
                success: true,
            });
        }
    }

    async function handleNewProject() {
        const title = prompt('Enter a short title for this project.');
        if (title?.length > 0) {
            await createProject(title);
        }
    }

    async function fetchProjects() {
        try {
            setLoading(true);
            setProjects(null);

            let { data, error, status } = await supabase.from('projects').select();

            if (error && status !== 406) {
                throw error;
            }

            setProjects(data);

        } catch (error) {
            setMessage({
                message: `Error loading projects!\n${error.message}`,
                success: false,
            });
        }
        finally {
            setLoading(false);
            setMessage({
                message: `Projects loaded.`,
                success: true,
            });
        }
    }

    const fetchCategoryData = async () => {
        try {
            setLoading(true);
            setCategories(null);

            let { data, error, status } = await supabase.from('categories').select().order('id');

            if (error && status != 406) {
                throw error;
            }

            setCategories(data);
        }
        catch (error) {
            setMessage({
                message: `Error loading category data!\n${error.message}`,
                success: false,
            });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!projects) fetchProjects();
        if (!categories) fetchCategoryData();
    });


    return (
        <section className={styles.container}>
            <h1 className={styles.title}><span>Admin Panel</span></h1>

            <MessageBox message={message} />

            <div className={styles.actionButtons}>
                <button onClick={handleNewProject}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
                            fill="currentColor"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                            fill="currentColor"
                        />
                    </svg>&nbsp; New Project
                </button>
                <button onClick={fetchProjects}>&#x21bb; &nbsp; Refresh</button>
                <button onClick={() => supabase.auth.signOut()}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.51428 20H4.51428C3.40971 20 2.51428 19.1046 2.51428 18V6C2.51428 4.89543 3.40971 4 4.51428 4H8.51428V6H4.51428V18H8.51428V20Z"
                            fill="currentColor"
                        />
                        <path
                            d="M13.8418 17.385L15.262 15.9768L11.3428 12.0242L20.4857 12.0242C21.038 12.0242 21.4857 11.5765 21.4857 11.0242C21.4857 10.4719 21.038 10.0242 20.4857 10.0242L11.3236 10.0242L15.304 6.0774L13.8958 4.6572L7.5049 10.9941L13.8418 17.385Z"
                            fill="currentColor"
                        />
                    </svg>&nbsp; Sign Out
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ProjectsPanel projects={projects} categories={categories} />
            )}

        </section >
    );
}