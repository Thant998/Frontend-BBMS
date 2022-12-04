import { Routes } from '@angular/router';


export const adminRoute: Routes = [
  {
    path: '',
    loadChildren: () => import('../portal.module').then(m => m.PortalModule),
  },
]