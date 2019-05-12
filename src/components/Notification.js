import { NotificationManager } from 'react-notifications';

export const notification = {
  info: message => NotificationManager.info(message),
  warning: message => NotificationManager.warning(message, '', 3000),
  success: message => NotificationManager.success(message, ''),
  error: message => NotificationManager.error(message, '')
};

export default notification;
