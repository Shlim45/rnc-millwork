import styles from '@/styles/FormWrapper.module.css'

const FormWrapper = ({ endpoint, method = "post", handleSubmit, children }) => {
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

export default FormWrapper;