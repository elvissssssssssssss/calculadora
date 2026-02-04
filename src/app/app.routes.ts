import { Routes } from '@angular/router';

export const routes: Routes = [
  // 1. Si entras a la raíz (localhost:4200), te manda a /admin
  { path: '', redirectTo: 'admin', pathMatch: 'full' },

  {
    path: 'admin',
    children: [
      // 2. ¡ESTO ES LO QUE TE FALTABA!
      // Si entras a /admin, te redirige automáticamente a /admin/dashboard
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // 3. Aquí carga tu componente C2 (CalculatorComponent)
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./calculator/calculator.component')
            .then(m => m.CalculatorComponent)
      }
    ]
  },

  // 4. Si escriben cualquier tontería, volver al inicio
  { path: '**', redirectTo: 'admin' }
];