/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import CreateRoom from '../../components/Unauthenticated/CreateRoom';

/** Library */
import Lib from 'pergunta-UFMG-lib';

/** Helpers */

/** Enums */

function RouteCreateRoom() {
  const navigator = useNavigate();

  return <CreateRoom />;
}

/** Exports */
export default RouteCreateRoom;
