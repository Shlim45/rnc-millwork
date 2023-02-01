import styles from '@/styles/Quote.module.css'
import QuoteForm from '@/components/QuoteForm'

const quote = () => {
    return (
        <section className={styles.main}>
            <h1><span className={styles.title}>Request For Quote</span></h1>
            <QuoteForm>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="subject">Subject</label>
                <input type="subject" id="subject" name="subject" placeholder="Type of project" required />

                <label htmlFor="description">Description</label>
                <textarea className={styles.description} id="description" name="description" rows="10" placeholder="Describe your project - be as descriptive as possible, please." required></textarea>

                <button type="submit">Submit</button>
            </QuoteForm>
        </section>
    )
}

export default quote