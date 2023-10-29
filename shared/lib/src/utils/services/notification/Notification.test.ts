import { INotificationData } from './NotificationInterfaces';
import { Notification } from './Notification';
import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from './NotificationEnums';

describe('Notification', () => {
  let notification, pushSpy, dismissSpy;
  beforeEach(() => {
    jest.clearAllMocks();
    pushSpy = jest.fn(() => Promise.resolve());
    dismissSpy = jest.fn();

    notification = new Notification();
    class NotificationImplementation extends notification.abstractClass {
      push(
        id: number,
        key: string,
        type: NotificationTypeEnum | NotificationTypeEnum[],
        status: NotificationStatusEnum,
        data: INotificationData
      ) {
        return pushSpy(id, key, type, status, data);
      }

      dismiss(id: number) {
        dismissSpy(id);
      }
    }
    notification.setImplementation(new NotificationImplementation());
  });

  it('should call push implementation with single type', () => {
    notification.push(
      'singleKey',
      NotificationTypeEnum.TOAST,
      NotificationStatusEnum.INFORMATIONAL,
      { title: 'testSingle', content: 'singleContent', data: { a: 1, b: 2 } }
    );
    expect(pushSpy).toHaveBeenCalledWith(
      0,
      'singleKey',
      NotificationTypeEnum.TOAST,
      NotificationStatusEnum.INFORMATIONAL,
      { title: 'testSingle', content: 'singleContent', data: { a: 1, b: 2 } }
    );
  });

  it('should call the dismiss implementation', () => {
    notification.dismiss(123);
    expect(dismissSpy).toHaveBeenCalledWith(123);
  });
});
