import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({
  providedIn: 'root',
})
export class ToastProvider {
  static readonly defaultErrorMsg = 'We are having trouble connecting at the moment. ' +
  'Please check your network connection and try again.';
  private readonly errorToastClass = 'error-toast';
  private readonly successToastClass = 'success-toast';

  constructor(private toastCtrl: ToastController) {}

  errorToast(message: string = ToastProvider.defaultErrorMsg): void {
    this.createToast(message, this.errorToastClass);
  }

  successToast(message: string): void {
    this.createToast(message, this.successToastClass);
  }

  async createToast(message: string,
                    cssClass: string,
                    duration: number = 3000,
                    position: 'top' | 'bottom' | 'middle' = 'top'
              ) {
    const toast = await this.toastCtrl.create({ message, cssClass, duration, position });
    await toast.present();
  }

}
