importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

var firebaseConfig = {

  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
// 
// https://github.com/firebase/quickstart-js/issues/71
// Payload example:
// {
//   "data": {
//       "title": "You got Mail",
//       "body": "from Barak Obama",
//       "click_action": "http://arco.loggi.com",
//       "icon": "https://media.giphy.com/media/11StaZ9Lj74oCY/giphy.gif"
//   },
//   "to": <TOKEN></TOKEN>
// }

messaging.setBackgroundMessageHandler(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: payload.data.click_action
  };

  send_message_to_all_clients(payload);

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]

self.addEventListener('notificationclick', function(event) {
  console.log(event);
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window"})
    .then(clientList => {
      console.log(clientList)
      for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          console.log(client)
          if (client.url === event.notification.data && 'focus' in client)
              return client.focus();
      }
      if (self.clients.openWindow)
          return self.clients.openWindow(event.notification.data);
    })
  );
});

function send_message_to_all_clients(msg) {
  self.clients.matchAll({ includeUncontrolled: true, type: 'window'}).then(clients => {
      clients.forEach(client => {
          send_message_to_client(client, msg).then(m => console.log("SW Received Message: " + m));
      })
  })
}

function send_message_to_client(client, msg) {
  return new Promise((resolve, reject) => {
      var msg_chan = new MessageChannel();

      msg_chan.port1.onmessage = event => {
          if (event.data.error) {
              reject(event.data.error);
          } else {
              resolve(event.data);
          }
      };

      client.postMessage(msg, [msg_chan.port2]);
  });
}
