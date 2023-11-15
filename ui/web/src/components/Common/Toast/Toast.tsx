/** React imports */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';

/** React Hooks */
import { useResize } from '../../../hooks';

/** Library */
import Lib, {
  INotificationData,
  NotificationStatusEnum,
} from 'pergunta-UFMG-lib';

/** Styles */
import './Toast.scss';

/** Assets */
import { XMarkIcon, CheckIcon } from '../../../assets/svg/icons';

/** Types */
type ToastCallPayload = {
  id: number;
  status: NotificationStatusEnum;
  data: INotificationData;
  onDismiss?: () => void;
};

/** Constants */
const DEFAULT_TOAST_CONFIG = {
  id: -1,
  status: NotificationStatusEnum.ERROR,
  data: {
    title: 'Default title',
    options: {
      duration: 5000,
    },
  },
};

const ToastComponent = () => {
  const [toastConfig, setToastConfig] =
    useState<ToastCallPayload>(DEFAULT_TOAST_CONFIG);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutToClose, setIsAboutToClose] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateToastConfigAndDispatch(
      newToastConfig: ToastCallPayload | undefined
    ) {
      newToastConfig
        ? setToastConfig(newToastConfig)
        : setToastConfig(DEFAULT_TOAST_CONFIG);
      setIsOpen(true);

      setUpToastAutoClosing();
    }

    const { NEW_WEB_TOAST_DISPATCHED, WEB_TOAST_DISMISSED } = Lib.utils.EVENTS;

    Lib.utils.subscribe(NEW_WEB_TOAST_DISPATCHED, updateToastConfigAndDispatch);
    Lib.utils.subscribe(WEB_TOAST_DISMISSED, handleClose);

    onResize();
    return () => {
      Lib.utils.unsubscribe(
        NEW_WEB_TOAST_DISPATCHED,
        updateToastConfigAndDispatch
      );
      Lib.utils.unsubscribe(WEB_TOAST_DISMISSED, handleClose);
    };
  }, []);

  function setUpToastAutoClosing() {
    const consideredTimeToClose =
      toastConfig.data.options?.duration ??
      DEFAULT_TOAST_CONFIG.data.options.duration;

    setTimeout(() => setIsAboutToClose(true), consideredTimeToClose);

    setTimeout(handleEndTimer, consideredTimeToClose + 500);
  }

  function handleEndTimer() {
    setIsOpen(false);
    setIsAboutToClose(false);

    toastConfig.onDismiss && toastConfig.onDismiss();
  }

  function handleClose() {
    setIsAboutToClose(true);

    setTimeout(handleEndTimer, 500);
  }

  function onResize() {
    if (window.innerWidth < 850) setIsMobile(true);
    else setIsMobile(false);
  }
  useResize(onResize);

  const positionToastClass = cx('toast-component__container', {
    isAboutToClose: isAboutToClose,
    isMobilePositioning: isMobile,
    defaultPositioning: !isMobile,
  });

  const typeToastClass = cx('toast-component__default', {
    [toastConfig.status]: toastConfig.status,
  });

  return (
    <>
      {isOpen && (
        <div className={positionToastClass}>
          <div className={typeToastClass}>
            {toastConfig.status === NotificationStatusEnum.SUCCESS ? (
              <CheckIcon className="toast-component__toast-icon" />
            ) : (
              <XMarkIcon
                className={cx('toast-component__toast-icon', {
                  [toastConfig.status]: toastConfig.status,
                })}
              />
            )}
            <span className="toast-component__message">
              {toastConfig.data.content}
            </span>
            <button
              className="toast-component__btn-close"
              onClick={handleClose}
            >
              <XMarkIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/** Exports */
export default ToastComponent;
