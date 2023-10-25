/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import AuthenticatedLayout from '../../components/Layout/Authenticated';

/** Route elements */
import RouteManageRoom from './RouteManageRoom';

/** Exports */
export default (
  <Route path="/rooms/:roomId" element={<AuthenticatedLayout />}>
    <Route path="/rooms/:roomId/admin" element={<RouteManageRoom />} />
  </Route>
);
