/** React Imports */
import React from 'react';

/** React Components */
import Button from '../../Common/Button';
import Input from '../../Common/Input';

/** Styles */
import './EnterRoom.scss';

/** Assets */
import { GoogleLogoIcon, LogInIcon } from '../../../assets/svg/icons';

type EnterRoomProps = {
  createRoomRedirect: () => void;
  enterRoomRedirect: (roomCode: string) => void;
};

function EnterRoom({ createRoomRedirect, enterRoomRedirect }: EnterRoomProps) {
  function handleEnterRoom(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const roomId = event.currentTarget.roomId.value as string;
    enterRoomRedirect(roomId);
  }

  return (
    <section className="enter-room-page__form-container">
      <form onSubmit={handleEnterRoom}>
        <Button
          icon={<GoogleLogoIcon />}
          modifier="outlined"
          onClick={createRoomRedirect}
          type="button"
        >
          Crie sua sala com o Google
        </Button>

        <span className="enter-room-page__separator">ou entre em uma sala</span>
        <div className="enter-room-page__submit-area">
          <Input
            controlId="roomId"
            inputLabel="Digite o código da sala"
            name="roomId"
          />
          <Button icon={<LogInIcon />} modifier="default" type="submit">
            Entrar na sala
          </Button>
        </div>
      </form>
    </section>
  );
}

/** Exports */
export default EnterRoom;
