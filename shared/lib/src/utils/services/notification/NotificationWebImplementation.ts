/**
 * @category Utility Service
 * @module Notification
 */

/** Class */
import { AbstractNotification } from './AbstractNotification';

/** Enums */
import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from './NotificationEnums';

/** Interfaces */
import { INotificationData } from './NotificationInterfaces';

/** Utils */
import { Utilities } from '../../Utilities';

/**
 * Default implementation class for Notification.
 * This class makes use of an interface that can be used by the Web UI.
 */
export class NotificationWebImplementation extends AbstractNotification {
  EMPTY_TOAST_ID = -1;
  #activeToastId: number;

  constructor() {
    super();
    this.#activeToastId = this.EMPTY_TOAST_ID;
  }

  private _dismiss(): void {
    this.#activeToastId = this.EMPTY_TOAST_ID;
  }

  /**
   * Pushes a notification.
   *
   * @param id - Unique identifier for the notification
   * @param key - Notification key used to avoid duplicates (e.g. toast type)
   * @param type - Notification type (e.g. toast, modal)
   * @param status - Notification status (success, error, warn, info)
   * @param data - Relevant data for displaying the notification
   * @returns Promise that will be resolved when notification is dismissed
   */
  public async push(
    id: number,
    _key: string,
    type: NotificationTypeEnum,
    status: NotificationStatusEnum,
    data?: INotificationData
  ): Promise<unknown> {
    if (type !== NotificationTypeEnum.TOAST) {
      Utilities.logging.warn(
        `Notification type ${type} is not supported by this implementation.`
      );
      return;
    }

    if (this.#activeToastId !== this.EMPTY_TOAST_ID)
      this.dismiss(this.#activeToastId);

    const { NEW_WEB_TOAST_DISPATCHED } = Utilities.EVENTS;

    return new Promise((resolve) => {
      resolve(
        Utilities.publish(NEW_WEB_TOAST_DISPATCHED, {
          id,
          status,
          data,
          onDismiss: this._dismiss.bind(this),
        })
      );
    });
  }

  /**
   * Dismisses a specific notification by its identifier.
   *
   * @param id - ID of the notification to be dismissed
   */
  public dismiss(id: number): void {
    if (this.#activeToastId !== id) return;

    const { WEB_TOAST_DISMISSED } = Utilities.EVENTS;

    Utilities.publish(WEB_TOAST_DISMISSED, id);
  }
}
