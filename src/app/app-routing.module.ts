import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/sign-in/sign-in';
import { SignInPageModule } from './pages/sign-in/sign-in.module';
import { AuthProvider } from './services/auth/auth';

const routes: Routes = [
  { path: '', canActivate: [AuthProvider], loadChildren: './pages/tabs/tabs.module#TabsModule'},
  { path: 'sign-in', component: SignInPage },
  { path: 'beer/:uuid', canActivate: [AuthProvider], loadChildren: './pages/beer-detail/beer-detail.module#BeerDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule, SignInPageModule]
})
export class AppRoutingModule { }
