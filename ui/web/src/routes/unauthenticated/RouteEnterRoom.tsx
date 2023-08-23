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

  return <EnterRoom />;
}

/** Exports */
export default RouteEnterRoom;
