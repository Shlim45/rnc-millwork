import styles from '@/styles/FormWrapper.module.css'

const FormWrapper = ({ endpoint = "#", method = "post", handleSubmit, children }) => {
    return (
        // We pass the event to the handleSubmit() function on submit.
        <>
            <div className={styles.container} onSubmit={handleSubmit}>
                <form className={styles.form} action={endpoint} method={method}>
                    {children}
                </form>
            </div>
        </>
    )
}

export default FormWrapper;