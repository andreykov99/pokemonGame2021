import cn from 'classnames';
import styles from './style.module.css'

const GamePage = () => {

    return (
        <>
            <div className={cn(styles.root, styles.flex)}>
                <h2>This is Game Page!</h2>
            </div>
        </>
    )
}
export default GamePage;