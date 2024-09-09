import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AppointmentViewComponent from './appointment-view/appointment-view.component';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppointmentViewComponent,AngularFireMessagingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fluid-appointment';
}
