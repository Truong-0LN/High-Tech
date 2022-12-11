import notifee, {AndroidImportance} from '@notifee/react-native';
import { AppTheme } from '../config/AppTheme';

const onDisplayNotification = async (title, body) => {
  const channelId = await notifee.createChannel({
    id: 'TraningFirebaseChannel',
    name: 'Training Firebase App',
    // importance: AndroidImportance.HIGH,
  });
  await notifee.displayNotification({
    id: `${Date.now().toString()}`,
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: '@mipmap/ic_launcher_round',
      color: AppTheme.Colors.Orange,
      sound: 'notification',
    },
  });
};

export default onDisplayNotification;
