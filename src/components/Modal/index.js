import { useRef } from 'react';

import cn from 'classnames';
import s from './style.module.css';

const Modal = ({ isOpen, title, children, onCloseModal }) => {
    const modalRef = useRef();

    const handleCloseClick = () => {
        onCloseModal && onCloseModal();
    }

    const handleRootClick = (e) => {
        if (!modalRef.current.contains(e.target)) handleCloseClick();
    }

    return (
        <div
            className={cn(s.root, { [s.open]: isOpen })}
            onClick={handleRootClick}>
            <div
                ref={modalRef}
                className={s.modal}>
                <div className={s.head}>
                    {title}
                    <span
                        className={s.btnClose}
                        onClick={handleCloseClick}
                    ></span>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;