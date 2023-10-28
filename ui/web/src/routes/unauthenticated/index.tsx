/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import OutRoomLayout from '../../components/Layout/OutRoom';

/** Route elements */
import RouteCreateRoom from './RouteCreateRoom';
import RouteEnterRoom from './RouteEnterRoom';

/** Exports */
export default (
  <Route path="/" element={<OutRoomLayout />}>
    <Route index element={<RouteEnterRoom />} />
    <Route path="/rooms/new" element={<RouteCreateRoom />} />
  </Route>
);
