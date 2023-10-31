/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import EnterRoom from '../../components/OutRoom/EnterRoom';

function RouteEnterRoom() {
  const navigator = useNavigate();

  function createRoomRedirect() {
    navigator('/rooms/new');
  }

  function enterRoomRedirect(roomCode: string) {
    navigator(`/rooms/${roomCode}`);
  }

  return (
    <EnterRoom
      createRoomRedirect={createRoomRedirect}
      enterRoomRedirect={enterRoomRedirect}
    />
  );
}

/** Exports */
export default RouteEnterRoom;
