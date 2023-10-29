/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import CreateRoom from '../../components/OutRoom/CreateRoom';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Helpers */

/** Enums */

function RouteCreateRoom() {
  const navigator = useNavigate();

  async function createRoom(roomTitle: string) {
    let user = Lib.auth.authenticatedUser;

    if (user === null) {
      user = await Lib.auth.auth();

      console.log('=>', user, roomTitle);
    }
  }

  return <CreateRoom createRoom={createRoom} />;
}

/** Exports */
export default RouteCreateRoom;
