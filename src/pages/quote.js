import SandBox from '@/components/SandBox'
import QuoteForm from '@/components/QuoteForm'
import styles from '@/styles/Home.module.css'

const quote = () => {
    return (
        <SandBox heading="Request For Quote">
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
        </SandBox>
    )
}

export default quote