import * as firebase from 'firebase/app';
import '@firebase/messaging';

import { storeNotification } from '../notifications';

var firebaseConfig = {

  };

// const vapidKey = <VAPID_KEY>
firebase.initializeApp(firebaseConfig);

export const init_messaging = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken({ vapidKey });

        console.log('Token do usuário:', token);

        return token;
    } catch (error) {
        console.error(error);
    }
}

// Handles message received either from window or the service worker
const message_received = msg => {
    storeNotification(msg.data);
}

// Handler for messages coming from the service worker
navigator.serviceWorker.addEventListener('message', event => {
    console.log("Client 1 Received Message:");
    console.log(event);
    message_received(event.data);
});
