import PropTypes from 'prop-types';
import { useRef } from 'react';

import cn from 'classnames';
import s from './style.module.css';

const Modal = ({ isOpen, title, children, onCloseModal }) => {
  const modalRef = useRef();

  const handleCloseClick = () => {
    onCloseModal();
  };

  const handleRootClick = (e) => {
    if (!modalRef.current.contains(e.target)) handleCloseClick();
  };
  const handleKeyPressed = (e) => {
    console.log(e);
    // TODO: if esc pressed close modal
  };

  return (
    <div
      role="button"
      tabIndex="0"
      className={cn(s.root, { [s.open]: isOpen })}
      onClick={handleRootClick}
      onKeyPress={handleKeyPressed}
    >
      <div ref={modalRef} className={s.modal}>
        <div className={s.head}>
          {title}
          <span
            role="button"
            tabIndex="0"
            className={s.btnClose}
            onClick={handleCloseClick}
            onKeyPress={handleCloseClick}
          />
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  isOpen: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.elementType,
  onCloseModal: PropTypes.func
};
export default Modal;
