/** React imports */
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** Styles */
import './UnauthenticatedLayout.scss';

/** Assets */
import { HomeIllustration } from '../../../assets/svg/illustrations';
import { LogoFull } from '../../../assets/svg/logo';

function UnauthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="unauthenticated-page">
        <aside className="unauthenticated-page__illustration-wrapper">
          <h2>Para cada pergunta existe uma resposta.</h2>
          <span>
            Compartilhe conhecimento e aprenda com outras pessoas, faça do jeito
            UFMG!
          </span>
          <div className="unauthenticated-page__illustration">
            <HomeIllustration />
          </div>
        </aside>
        <main className="unauthenticated-page__content">
          <LogoFull />
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
}

/** Exports */
export default UnauthenticatedLayout;
