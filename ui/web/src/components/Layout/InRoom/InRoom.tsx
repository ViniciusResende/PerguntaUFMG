/** React imports */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React Components */
import Header from './elements/Header/Header';

/** Styles */
import './InRoom.scss';

function InRoom() {
  return (
    <Suspense fallback="loading">
      <div className="in-room-page">
        <Header isRoomClosed={false} roomId="-NdWHKxtjhM8jI46vEcP" />
        <main className="in-room-page__content">
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
}

/** Exports */
export default InRoom;
