/** React imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Routes */
import RouteUnauthenticated from './unauthenticated';

/** Exports */
export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">{RouteUnauthenticated}</Route>
    </Routes>
  </BrowserRouter>
);
