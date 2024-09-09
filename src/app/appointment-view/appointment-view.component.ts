import { Component, inject, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Appointment, AppointmentService } from '../appointment.service';
import { DatePipe } from '@angular/common';
import { Messaging, getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Component({
  standalone: true,
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css'],
  providers: [DatePipe]
})
export default class AppointmentViewComponent implements OnInit {
  appointment: any;
  expectedTime = '';
  date: string = '';
  time: string = '';
  private readonly _messaging = inject(Messaging);
  // private readonly _message = new BehaviorSubject<any>(undefined);
  private readonly _message: Messaging = getMessaging();

  title = 'fcm-angular-demo';
  // message$ = this._message.asObservable();

  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private appointmentService: AppointmentService,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {
    console.log(this.appointment);
  }
  ngOnInit(): void {


    // debugger
    const url = new URL(document.location.href);
    const apptIdFromUrl = url.searchParams.get('apptId');
    if (apptIdFromUrl) {
      this.appointmentService
        .getAppointment(apptIdFromUrl)
        .subscribe((data) => {
          this.appointment = data.items[0];
          this.expectedTime = data.items[0].expectedTime;
          this.splitDateTime()
        });
    }

// Request permission to receive notifications
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') 
    console.log('Permission granted');
  else if (permission === 'denied')
    console.log('Permission denied');
  else if (permission === 'default') {
    console.log('Permission request ignored');
  }
});


navigator.serviceWorker.register('/fluid/assets/firebase-messaging-sw.js', { scope: '/fluid/assets/' })
  .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
    if (registration.installing) {
      console.log('Service worker installing');
    } else if (registration.waiting) {
      console.log('Service worker installed but waiting');
    } else if (registration.active) {
      console.log('Service worker active');
    }
    // Pass the full ServiceWorkerRegistration object
    return getToken(this._messaging, { serviceWorkerRegistration: registration })
      .then((token) => {
        console.log('TokenDevice', token);
        // You can send this token to your server and store it there
        // You can also use this token to subscribe to topics

          this.setWebToken(apptIdFromUrl,token).subscribe(
            response => {
              console.log('Web token set successfully:', response);
            },
            error => {
              console.error('Error setting web token:', error);
            }
          );
          this.setupMessageListener();
      })
      .catch((error) => console.log('Token error', error));
  })
  .catch((error) => {
    console.error('Service Worker registration failed:', error);
  });

  
    // Get the current FCM token
    


    // Listen for messages from FCM
  //   onMessage(this._message, {
  //     next: (payload) => {
  //       console.log('Message', payload);
  //       // You can display the message or do something else with it
  //     },
  //     error: (error) => console.log('Message error', error),
  //     complete: () => console.log('Done listening to messages')
  //  } );  
  



    // this.route.queryParams.subscribe((params) => {
    //   const apptId = params['apptId'];
    //   console.log(this.route);

    //   if (apptId) {
    //     this.appointmentService.getAppointment(apptId).subscribe((data) => {
    //       this.appointment = data.items;

    //     });
    //   }
    // });
  }

  setupMessageListener() {
    console.log('Setting up message listener');
    // onMessage(this._messaging, (payload) => {
    //   console.log('Message received:', payload);
    //   // Handle the message here (e.g., show a notification)
    // });

       // Listen for messages from FCM
    onMessage(this._message, {
      next: (payload) => {
        console.log('Message', payload);
        // const notificationBody = payload?['data']?['text']
        // console.log('Title:' , notificationTitle)
        // console.log('Body:' , notificationBody)
        if (payload['data'] && payload['data']['text']) {
          const message = payload['data']['text'];
          console.log(message);
          this.notificationService.success(message);          
      }
        // window.alert(payload)
        // You can display the message or do something else with it
      },
      error: (error) => {console.log('Message error', error)

        // window.alert(error)
      },
      complete: () => console.log('Done listening to messages')
   } ); 
  }

  splitDateTime() {
    const [datePart, timePart] = this.expectedTime.split(' ');
    const [day, month, year] = datePart.split('-');
    const formattedDate = new Date(`${year}-${month}-${day}T${timePart}`);

    this.date = this.datePipe.transform(formattedDate, 'dd-MM-yyyy') || '';
    this.time = this.datePipe.transform(formattedDate, 'hh:mm a') || '';
  }

  setWebToken(apptIdFromUrl: string | null, token: string) {
    const url = `https://192.168.101.155:8443/ords/fluid/clnt/setWebToken?apptId=${apptIdFromUrl}&webToken=${token}`;

    return this.http.put(url, {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
