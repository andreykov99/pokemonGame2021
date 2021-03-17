import cn from 'classnames';
import styles from './style.module.css'

const ContactPage = () => {

    return (
        <>
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Contact Page!</h2>
            </div>
        </>
    )
}
export default ContactPage;