/**
 * @category Utility Service
 * @module Notification
 */

/**
 * Relevant data for displaying a notification.
 */
export interface INotificationData {
  title: string;
  content?: string;
  options?: INotificationOptions;
}

/**
 * General options for displaying a notification.
 */
export interface INotificationOptions {
  duration?: number;
  persistent?: boolean;
}

/**
 * Returned value's data structure for a notification push call.
 */
export interface INotificationPushReturn {
  id: number;
  promise: Promise<unknown>;
}
