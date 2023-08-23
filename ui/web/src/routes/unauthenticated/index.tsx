/** React imports */
import { Route } from 'react-router-dom';

/** Layouts */
import UnauthenticatedLayout from '../../components/Layout/Unauthenticated';

/** Route elements */
import RouteEnterRoom from './RouteEnterRoom';

/** Exports */
export default (
  <Route path="/" element={<UnauthenticatedLayout />}>
    <Route index element={<RouteEnterRoom />} />
  </Route>
);
