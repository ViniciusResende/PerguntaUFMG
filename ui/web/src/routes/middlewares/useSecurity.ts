/** React imports */
import { useEffect } from 'react';

/** Library */
import Lib from 'pergunta-UFMG-lib';

function useSecurity() {
  useEffect(() => {
    const logIn = async () => {
      await Lib.auth.auth();
    };

    const { API_REQUEST_UNAUTHORIZED } = Lib.utils.security.EVENTS;

    Lib.utils.security.subscribe(API_REQUEST_UNAUTHORIZED, logIn);
    return () => {
      Lib.utils.security.unsubscribe(API_REQUEST_UNAUTHORIZED, logIn);
    };
  }, []);
}

export default useSecurity;
