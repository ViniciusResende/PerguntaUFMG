/**
 * @category Utility Service
 * @module Notification
 */

/** Interfaces */
import { IClass } from '../../../data/interfaces/CommonInterfaces';
import {
  INotificationData,
  INotificationPushReturn,
} from './NotificationInterfaces';

/** Enums */
import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from './NotificationEnums';

/** Classes */
import { Bridge } from '../../classes/bridge/Bridge';
import { AbstractNotification } from './AbstractNotification';

/**
 * Service to handle notifications.
 *
 * @remarks Provides a bridge to an external implementation.
 */

export class Notification extends Bridge<AbstractNotification> {
  private currentId = 0;

  readonly STATUS = NotificationStatusEnum;
  readonly TYPE = NotificationTypeEnum;

  constructor() {
    super(AbstractNotification as IClass<AbstractNotification>);
  }

  /**
   * Pushes a notification.
   *
   * @param key - Notification key used to avoid duplicates (e.g. toast type)
   * @param type - Notification type (e.g. toast, panel, modal)
   * @param status - Notification status (success, error, warn, info)
   * @param data - Notification content
   * @returns Notification ID and Promise
   */
  push(
    key: string,
    type: NotificationTypeEnum,
    status: NotificationStatusEnum = NotificationStatusEnum.INFORMATIONAL,
    data?: INotificationData
  ): INotificationPushReturn {
    const id = this.currentId++;
    const promise = this.implementation.push(id, key, type, status, data);
    return {
      id,
      promise,
    };
  }

  /**
   * Dismisses a specific notification by its identifier.
   *
   * @param id - ID of the notification to be dismissed
   */
  dismiss(id: number): void {
    this.implementation.dismiss(id);
  }
}
