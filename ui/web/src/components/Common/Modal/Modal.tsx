/** React Imports */
import React from 'react';
import cx from 'classnames';

/** Styles */
import './Modal.scss';

type ModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  icon: React.ReactNode;
  noConfirmButtons?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
};

function Modal({
  isOpen,
  title,
  message,
  icon,
  noConfirmButtons,
  onConfirm,
  onCancel,
}: ModalProps) {
  return (
    <>
      <div
        className={cx('modal-overlay', { open: isOpen })}
        onClick={onCancel}
      />
      <div className={cx('modal-container', { open: isOpen })}>
        <div aria-label="Modal Icon">{icon}</div>
        <h3>{title}</h3>
        <span>{message}</span>
        <div className="modal-button-container">
          {!noConfirmButtons ? (
            <>
              <button onClick={onCancel}>Cancelar</button>
              <button onClick={onConfirm}>Confirmar</button>
            </>
          ) : (
            <button onClick={onCancel}>Ok</button>
          )}
        </div>
      </div>
    </>
  );
}

/** Exports */
export default Modal;
