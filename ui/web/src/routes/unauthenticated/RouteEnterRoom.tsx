/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import EnterRoom from '../../components/Unauthenticated/EnterRoom';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Helpers */

/** Enums */

function RouteEnterRoom() {
  const navigator = useNavigate();

  function createRoomRedirect() {
    navigator('/rooms/new');
  }

  return <EnterRoom createRoomRedirect={createRoomRedirect} />;
}

/** Exports */
export default RouteEnterRoom;
