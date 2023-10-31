/** React Imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** React Components */
import Button from '../../../../Common/Button';
import CopyCodeButton from '../CopyCodeButton';

/** Styles */
import './Header.scss';

/** Assets */
import { LogoFull } from '../../../../../assets/svg/logo';

type HeaderProps = {
  isRoomClosed: boolean;
  roomId: string;
  endRoom?: () => void;
};

const Header = ({ isRoomClosed, roomId, endRoom }: HeaderProps) => {
  return (
    <header className="header-component">
      <div className="header-component__wrapper">
        <Link to="/" className="header-component__logo-wrapper">
          <LogoFull />
        </Link>

        <div className="header-component__side-buttons">
          <CopyCodeButton code={roomId} />
          {endRoom && (
            <Button
              className="header-component__close-room-btn"
              disabled={isRoomClosed}
              modifier="outlined"
              onClick={endRoom}
              type="button"
            >
              Encerrar Sala
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
