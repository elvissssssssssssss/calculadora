// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 Importante

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // 👈 Importante
  template: `<router-outlet></router-outlet>` 
})
export class AppComponent {}