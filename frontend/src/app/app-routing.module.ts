// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'products', component: ProductsComponent },
  {
  path: 'welcome',
  component: WelcomeComponent, // ✅ Add this
  },

  {
    path: '',
    redirectTo: 'auth/login',  // default route redirects to login
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',  // wildcard redirects to login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
