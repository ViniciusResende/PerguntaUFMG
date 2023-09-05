/** React Imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** React Components */
import Button from '../../Common/Button';
import Input from '../../Common/Input';

/** Styles */
import './CreateRoom.scss';

type CreateRoomProps = {
  createRoom: (roomTitle: string) => void;
};

function CreateRoom({ createRoom }: CreateRoomProps) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const roomTitle = (event.target as any).roomTitle.value as string;
    createRoom(roomTitle);
  }

  return (
    <section className="create-room-page__form-container">
      <form onSubmit={onSubmit}>
        <h3 className="create-room-page__title">Crie uma nova sala</h3>
        <div className="create-room-page__submit-area">
          <Input
            controlId="roomTitle"
            inputLabel="Nome da sala"
            name="roomTitle"
          />
          <Button modifier="default" type="submit">
            Criar sala
          </Button>
          <span className="create-room-page__enter-room-message">
            Quer entrar em uma sala já existente?{' '}
            <Link to="/">Clique aqui</Link>
          </span>
        </div>
      </form>
    </section>
  );
}

/** Exports */
export default CreateRoom;
