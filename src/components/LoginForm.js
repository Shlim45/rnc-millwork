import FormWrapper from "./FormWrapper";
import { server } from "@/config";
import { supabase } from "@/utils/supabaseClient";
import styles from '@/styles/Home.module.css'
import { useState } from "react";

const LoginForm = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (loading) { return; }

        try {
            setLoading(true);
            setSuccess(false);
            setMessage(undefined);

            const { data, error } = await supabase.auth.signInWithOtp({
                email: event.target.email.value,
                options: {
                    emailRedirectTo: `${server}/admin`,
                },
            });

            if (error) {
                console.error(error);
                throw error;
            }

            setSuccess(true);
            setMessage(`A log in link has been sent to the given email address.`);

            if (data) {
                console.log(data);
            }

        }
        catch (error) {
            setMessage(`Log in error: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className={styles.sandbox}>
            <div style={{ height: "100px", fontSize: "1rem" }}>
                {message &&
                    <span style={success ? { color: "lightgreen" } : { color: "red" }}>{message}</span>}
            </div>

            <h1 className={styles.sandbox__header}><span>Log in</span></h1>

            <FormWrapper handleSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <button type="submit">Email Magic Link</button>
            </FormWrapper>
        </section>
    )
}

export default LoginForm;