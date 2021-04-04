import s from './style.module.css';

const Input = ({ type = 'text', label, value, name, onChange }) => {
    return (
        <div className={s.root}>
            <input
                type={type}
                className={s.input}
                name={name}
                value={value}
                onChange={onChange}
                required />
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label className={s.label}>{label}</label>
        </div>
    )
}

export default Input;