/** React imports */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React Components */
import Header from './elements/Header/Header';

/** Styles */
import './AuthenticatedLayout.scss';

function AuthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="authenticated-page">
        <Header isRoomClosed={false} roomId="-NdWHKxtjhM8jI46vEcP" />
        <main className="authenticated-page__content">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
}

/** Exports */
export default AuthenticatedLayout;
