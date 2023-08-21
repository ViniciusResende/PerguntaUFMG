/** React imports */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Routes */

/** Exports */
export default (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="/" element={<div>Hello World</div>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
