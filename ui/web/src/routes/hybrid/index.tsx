/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import InRoomLayout from '../../components/Layout/InRoom';

/** Route elements */
import RouteRoom from './RouteRoom';

/** Exports */
export default (
  <Route path="/rooms/:roomId" element={<InRoomLayout />}>
    <Route index element={<RouteRoom />} />
  </Route>
);
