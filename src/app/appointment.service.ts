import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Appointment {
  sltoId: number;
  arrivalTime: string; 
  isFollowup: string; 
  providerEnName: string;
  providerArName: string;
  customerEnName: string;
  customerArName: string;
  facilityEnName: string;
  facilityArName: string;
  specialtyDescriptionEn: string;
  specialtyDescriptionAr: string;
  specialtyCode: string;
}

@Injectable({
providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = 'https://192.168.101.155:8443/ords/fluid/appt/getAppt';

  constructor(private http: HttpClient) {}

  getAppointment(appointmentId: string): Observable<any> {
    return this.http.get<Appointment>(`${this.apiUrl}?apptId=${appointmentId}&langId=EN`);
  }
}
