/** React imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Routes */
import RouteAuthenticated from './authenticated';
import RouteUnauthenticated from './unauthenticated';

/** Exports */
export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">{RouteAuthenticated}</Route>
      <Route path="/">{RouteUnauthenticated}</Route>
    </Routes>
  </BrowserRouter>
);
