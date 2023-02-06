import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function AdminPanel({ session }) {
    const supabase = useSupabaseClient();
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState(null);

    // useEffect(() => {
    //     loadProjects()
    // }, [loadProjects]);

    async function loadProjects() {
        try {
            if (!session) {
                return;
            }
            setLoading(true);

            let { data, error, status } = await supabase
                .from('projects')
                .select('*');

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setProjects(data);
            }

        } catch (error) {
            // alert('Error loading projects!');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h1>Admin Panel</h1>
            {projects
                ? (
                    <ul>
                        {projects.map(project => (
                            <li key={project.id}>{project.title}</li>
                        ))}
                    </ul>
                )
                : (
                    <div>
                        <button
                            className="button primary block"
                            onClick={() => loadProjects({ session })}
                            disabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Load Projects'}
                        </button>
                    </div >
                )
            }

            <button onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>
        </section >
    )
    // const supabase = useSupabaseClient()
    // const user = useUser()
    // const [loading, setLoading] = useState(true)
    // const [username, setUsername] = useState(null)
    // const [avatar_url, setAvatarUrl] = useState(null)

    // useEffect(() => {
    //     getProfile()
    // }, [session, getProfile])

    // async function getProfile() {
    //     try {
    //         setLoading(true)

    //         let { data, error, status } = await supabase
    //             .from('profiles')
    //             .select(`username, avatar_url`)
    //             .eq('id', user.id)
    //             .single()

    //         if (error && status !== 406) {
    //             throw error
    //         }

    //         if (data) {
    //             setUsername(data.username)
    //             setAvatarUrl(data.avatar_url)
    //         }
    //     } catch (error) {
    //         alert('Error loading user data!')
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // async function updateProfile({ username, avatar_url }) {
    //     try {
    //         setLoading(true)

    //         const updates = {
    //             id: user.id,
    //             username,
    //             avatar_url,
    //             updated_at: new Date().toISOString(),
    //         }

    //         let { error } = await supabase.from('profiles').upsert(updates)
    //         if (error) throw error
    //         alert('Profile updated!')
    //     } catch (error) {
    //         alert('Error updating the data!')
    //         console.log(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // return (
    //     <div className="form-widget">
    //         <div>
    //             <label htmlFor="email">Email</label>
    //             <input id="email" type="text" value={session.user.email} disabled />
    //         </div>
    //         <div>
    //             <label htmlFor="username">Username</label>
    //             <input
    //                 id="username"
    //                 type="text"
    //                 value={username || ''}
    //                 onChange={(e) => setUsername(e.target.value)}
    //             />
    //         </div>

    //         <div>
    //             <button
    //                 className="button primary block"
    //                 onClick={() => updateProfile({ username, avatar_url })}
    //                 disabled={loading}
    //             >
    //                 {loading ? 'Loading ...' : 'Update'}
    //             </button>
    //         </div>

    //         <div>
    //             <button className="button block" onClick={() => supabase.auth.signOut()}>
    //                 Sign Out
    //             </button>
    //         </div>
    //     </div>
    // )
}