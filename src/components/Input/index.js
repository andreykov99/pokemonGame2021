import PropTypes from 'prop-types';
import s from './style.module.css';

const Input = ({ type = 'text', label, value, name, onChange, error }) => (
  <div className={s.root}>
    <input
      id={name}
      type={type}
      className={s.input}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
    <span className={s.highlight} />
    <span className={s.bar} />
    <label htmlFor={name} className={s.label}>
      {label}
    </label>
    {error && <p className={s.errormsg}>{error}</p>}
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};
export default Input;
