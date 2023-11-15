/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import CreateRoom from '../../components/OutRoom/CreateRoom';

/** Library */
import Lib from 'pergunta-UFMG-lib';

function RouteCreateRoom() {
  const navigator = useNavigate();

  async function createRoom(roomTitle: string) {
    let user = Lib.auth.authenticatedUser;

    if (user === null) user = await Lib.auth.auth();

    if (user !== null) {
      const createRoomData = {
        title: roomTitle,
        authorId: user.id,
      };

      const roomId = await Lib.room.createRoom(createRoomData);

      navigator(`/rooms/${roomId}/admin`);
    }
  }

  return <CreateRoom createRoom={createRoom} />;
}

/** Exports */
export default RouteCreateRoom;
