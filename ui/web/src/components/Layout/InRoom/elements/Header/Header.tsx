/** React Imports */
import React from 'react';

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
};

const Header = ({ isRoomClosed, roomId }: HeaderProps) => {
  return (
    <header className="header-component">
      <div className="header-component__wrapper">
        <aside className="header-component__logo-wrapper">
          <LogoFull />
        </aside>

        <div className="header-component__side-buttons">
          <CopyCodeButton code={roomId} />
          <Button
            className="header-component__close-room-btn"
            disabled={isRoomClosed}
            modifier="outlined"
            onClick={() => {}}
            type="button"
          >
            Encerrar Sala
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
