/** React imports */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React Components */
import Toast from '../../Common/Toast';

/** Styles */
import './OutRoom.scss';

/** Assets */
import { HomeIllustration } from '../../../assets/svg/illustrations';
import { LogoFull } from '../../../assets/svg/logo';

function OutRoom() {
  return (
    <Suspense fallback="loading">
      <div className="out-room-page">
        <aside className="out-room-page__illustration-wrapper">
          <h2>Para cada pergunta existe uma resposta.</h2>
          <span>
            Compartilhe conhecimento e aprenda com outras pessoas, faça do jeito
            UFMG!
          </span>
          <div className="out-room-page__illustration">
            <HomeIllustration />
          </div>
        </aside>
        <main className="out-room-page__content">
          <LogoFull />
          <Outlet />
          <Toast />
        </main>
      </div>
    </Suspense>
  );
}

/** Exports */
export default OutRoom;
