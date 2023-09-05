import FormWrapper from "./FormWrapper";
import { server } from "@/config";
import { supabase } from "@/utils/supabaseClient";
import SandBox from "./SandBox";
import MessageBox from "./MessageBox";
import { useState } from "react";

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
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

            setMessage({
                message: `A log in link has been sent to the given email address.`,
                success: true,
            });
        }
        catch (error) {
            setMessage({
                message: `Log in error: ${error.message}`,
                success: false,
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <SandBox heading="Log In">
            <MessageBox message={message} />
            <FormWrapper handleSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <button type="submit" disabled={loading}>Email Magic Link</button>
            </FormWrapper>
        </SandBox>
    )
}

export default LoginForm;