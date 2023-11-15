/**
 * @category Utility Service
 * @module Notification
 */

/** Enums */
import { LibNotificationTypeEnum } from '../../../data/enums/CommonEnums';

/** Classes */
import { AbstractNotification } from './AbstractNotification';
import { NotificationWebImplementation } from './NotificationWebImplementation';

/**
 * Mapping between Notification Implementation type and implementation class.
 *
 */
export const notificationImplementationTypeMap = new Map<
  LibNotificationTypeEnum,
  AbstractNotification
>([[LibNotificationTypeEnum.WEB, new NotificationWebImplementation()]]);
