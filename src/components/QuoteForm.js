import FormWrapper from "./FormWrapper";
import { useState } from "react";
import MessageBox from "./MessageBox";

const QuoteForm = ({ children }) => {
    const [message, setMessage] = useState(null);

    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            name: event.target.name.value,
            phone: event.target.phone.value,
            email: event.target.email.value,
            subject: event.target.subject.value,
            description: event.target.description.value,
        };

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/quote'

        // Form the request for sending data to the server.
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        if (response.ok) {
            setMessage({
                message: `Your request for a quote has been submitted successfully!`,
                success: true,
            });
        }
        else {
            const result = await response.json();
            setMessage({
                message: `Oops... something went wrong!  Error ${response.status} - ${result.data}  Please email us at RoetterBill@RCCustomMillworks.com for a quote!`,
                success: false,
            });
        }
    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <FormWrapper
            endpoint="/api/quote"
            method="post"
            handleSubmit={handleSubmit}
        >
            <MessageBox message={message} />

            {children}
        </FormWrapper>
    )
}

export default QuoteForm;