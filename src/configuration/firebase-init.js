import * as firebase from 'firebase/app';
import '@firebase/messaging';

var firebaseConfig = {
    // add configs here
  };

firebase.initializeApp(firebaseConfig);

// const vapidKey = <VAPID_KEY>

export const messaging = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken({ vapidKey });

        console.log('token do usuário:', token);
        return messaging;
    } catch (error) {
        console.error(error);
    }
}






