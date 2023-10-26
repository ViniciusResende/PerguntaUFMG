/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import InRoomLayout from '../../components/Layout/InRoom';

/** Route elements */
import RouteManageRoom from './RouteManageRoom';

/** Exports */
export default (
  <Route path="/rooms/:roomId" element={<InRoomLayout />}>
    <Route path="/rooms/:roomId/admin" element={<RouteManageRoom />} />
  </Route>
);
