import FormWrapper from "./FormWrapper";
import { server } from "@/config";
import { supabase } from "@/utils/supabaseClient";
// import styles from '@/styles/Home.module.css'
import SandBox from "./SandBox";
import { useState } from "react";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                throw error;
            }

            setSuccess(true);
            setMessage(`A log in link has been sent to the given email address.`);
        }
        catch (error) {
            setMessage(`Log in error: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <SandBox heading="Log In">
            <div style={{ height: "100px", fontSize: "1rem" }}>
                {message &&
                    <span style={success ? { color: "lightgreen" } : { color: "red" }}>{message}</span>}
            </div>

            <FormWrapper handleSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <button type="submit" disabled={loading}>Email Magic Link</button>
            </FormWrapper>
        </SandBox>
    )
}

export default LoginForm;