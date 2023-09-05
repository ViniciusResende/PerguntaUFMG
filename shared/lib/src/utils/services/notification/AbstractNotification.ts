/**
 * @category Utility Service
 * @module Notification
 */

/** Interfaces */
import { INotificationData } from './NotificationInterfaces';

/** Enums */
import {
  NotificationStatusEnum,
  NotificationTypeEnum,
} from './NotificationEnums';

/**
 * Abstract method signatures for Notification service.
 * Those methods should be implemented externally by the bridge.
 */
export abstract class AbstractNotification {
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
  abstract push(
    id: number,
    key: string,
    type: NotificationTypeEnum,
    status: NotificationStatusEnum,
    data?: INotificationData
  ): Promise<unknown>;

  /**
   * Dismisses a specific notification by its identifier.
   *
   * @param id - ID of the notification to be dismissed
   */
  abstract dismiss(id: number): void;
}
