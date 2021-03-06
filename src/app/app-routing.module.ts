import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/sign-in/sign-in';
import { SignInPageModule } from './pages/sign-in/sign-in.module';
import { AuthProvider } from './services/auth/auth';

const routes: Routes = [
  { path: '', canActivate: [AuthProvider], loadChildren: './pages/tabs/tabs.module#TabsModule'},
  { path: 'sign-in', component: SignInPage },
  { path: 'register', loadChildren: './pages/registration/registration.module#RegistrationPageModule'},
  { path: 'disclaimer', loadChildren: './pages/disclaimer/disclaimer.module#DisclaimerPageModule'},
  { path: 'email-sent', loadChildren: './pages/email-sent/email-sent.module#EmailSentPageModule'},
  { path: 'send-email/:reason', loadChildren: './pages/send-email/send-email.module#SendEmailPageModule' },
  { path: 'send-email', loadChildren: './pages/send-email/send-email.module#SendEmailPageModule' },
  { path: 'beer-profile', loadChildren: './pages/beer-profile/beer-profile.module#BeerProfilePageModule' },
  { path: 'confirm-email/:key', loadChildren: './pages/confirm-email/confirm-email.module#ConfirmEmailPageModule'},
  { path: 'password-reset/:b64encoded/:token', loadChildren: './pages/password-reset/password-reset.module#PasswordResetPageModule' },
  { path: '**', redirectTo: 'tabs/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule, SignInPageModule]
})
export class AppRoutingModule { }
