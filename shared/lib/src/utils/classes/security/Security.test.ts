/** Classes */
import { SecurityClass } from './Security';

/** Interfaces */
import { ILibGeneralErrorPayload } from '../../../data/interfaces/CommonInterfaces';

/** Enums */
import { SecurityEvents } from './SecurityEnums';

describe('Security', () => {
  const FAKE_MOCK_USER = {
    id: '123',
    name: 'fake user',
    profile: 'fake profile',
  };

  let security: SecurityClass;
  beforeEach(() => {
    jest.clearAllMocks();
    security = new SecurityClass();
  });

  it('should correctly set user when method is called', () => {
    jest.spyOn(security, 'publish');

    security.user = FAKE_MOCK_USER;

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.NEW_USER_AUTH,
      FAKE_MOCK_USER
    );
  });

  it('should correctly excludeAuthenticatedUser when method is called', () => {
    jest.spyOn(security, 'publish');

    security.excludeAuthenticatedUser();

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.EXCLUDE_AUTH_USER,
      null
    );
  });

  describe('should correctly get auth when method is called', () => {
    it('should perform correctly when there is token stored', () => {
      jest.spyOn(security, 'publish');

      security.user = FAKE_MOCK_USER;

      const user = security.user;

      expect(user).toEqual(FAKE_MOCK_USER);
      expect(security.publish).toHaveBeenCalledTimes(1);
      expect(security.publish).not.toHaveBeenCalledWith(
        SecurityEvents.NO_AUTH_USER_STORED,
        null
      );
    });

    it('should perform correctly when there is no token stored', () => {
      jest.spyOn(security, 'publish');

      security.excludeAuthenticatedUser();
      const user = security.user;

      expect(user).toEqual(null);
      expect(security.publish).toHaveBeenCalledTimes(2);
      expect(security.publish).toHaveBeenCalledWith(
        SecurityEvents.NO_AUTH_USER_STORED,
        null
      );
    });
  });

  it('should correctly publishApiRequestUnauthorized when method is called', () => {
    jest.spyOn(security, 'publish');

    const genericErrorPayload: ILibGeneralErrorPayload = {
      errorCode: 401,
      errorMessage: 'Token Expired',
    };

    security.publishApiRequestUnauthorized(genericErrorPayload);

    expect(security.publish).toHaveBeenCalledTimes(1);
    expect(security.publish).toHaveBeenCalledWith(
      SecurityEvents.API_REQUEST_UNAUTHORIZED,
      genericErrorPayload
    );
  });
});
