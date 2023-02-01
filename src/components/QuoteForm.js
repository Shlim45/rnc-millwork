import styles from '@/styles/QuoteForm.module.css'

const QuoteForm = ({ endpoint = "/api/quote", method = "post", contents = "application/json", children }) => {
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
        // const endpoint = '/api/form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: method,
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': contents,
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        alert(`SERVER RECEIVED: \n${result.data}`);
    }

    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
            <div className={styles.form} onSubmit={handleSubmit}>
                <form action={endpoint} method={method}>
                    {children}
                </form>
            </div>
        </>
    )
}

export default QuoteForm;