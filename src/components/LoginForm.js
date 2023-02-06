import FormWrapper from "./FormWrapper";
import { server } from "@/config";
import { supabase } from "@/utils/supabaseClient";
import styles from '@/styles/Quote.module.css'

const LoginForm = () => {
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();


        const { data, error } = await supabase.auth.signInWithOtp({
            email: event.target.email.value,
            options: {
                emailRedirectTo: `${server}/admin`,
            },
        });

        if (error) {
            alert(error);
            console.error(error);
        }

        if (data) {
            console.log(data);
        }
    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <section className={styles.main}>
            <h1><span className={styles.title}>Log in</span></h1>

            <FormWrapper
                endpoint="/api/login"
                method="post"
                handleSubmit={handleSubmit}
            >
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <button type="submit">Email Magic Link</button>
            </FormWrapper>
        </section>
    )
}

export default LoginForm;