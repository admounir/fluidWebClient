importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDigugEnxxJdrrmY8WjK4MFJ-QJR7fE3mI",
  authDomain: "fluid-1f156.firebaseapp.com",
  projectId: "fluid-1f156",
  storageBucket: "fluid-1f156.appspot.com",
  messagingSenderId: "633954875674",
  appId: "1:633954875674:web:7db8d7ad2ae0d659ebd4a3",
  measurementId: "G-PQC14GKLS2",
  vapidKey:"BAV8-r3HKGt-e7-3kJhJRyAD_zb5HnQlfxY-CxiUSw4tgwUUPnvDRSE8ps-m_6Mbt0E-na1uZ7p-ESlq9Z6_klw"

});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log('Received background message:', JSON.stringify(payload));
  self.clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then(clients => {
    if (clients.length > 0) {
      // Browser is open
      clients.sort((a, b) => b.lastFocusTime - a.lastFocusTime);
      
      // Get the most recently focused client
      const mostRecentClient = clients[0];
      
      if (mostRecentClient.url.includes('fluid')) {
        console.log('Browser is open and URL contains fluid');
        // You can send a message to the client or perform other actions
        // fluidClient.postMessage({
        //   type: 'NOTIFICATION',
        //   payload: payload
        // });
      } else {
        console.log('Browser is open but URL does not contain fluid');
        showNotification(payload);
      }
    } else {
      console.log('Browser is not open');
      showNotification(payload);
    }
  });
});

function showNotification(payload) {
 // Customize notification here
 const notificationTitle = 'Fluid';

//  const notificationBody = payload.data.text;
 const notificationBody = payload['data']['text'];
 console.log('Title:' , notificationTitle)
 console.log('Body:' , notificationBody)
 const notificationOptions = {
   body: notificationBody
   //,icon: '/fluid/assets/firebase-logo.png',

 };
 self.registration.showNotification(notificationTitle, notificationOptions) 
 .then(() => console.log('Notification shown successfully'))
 .catch(error => console.error('Error showing notification:', error));;
}