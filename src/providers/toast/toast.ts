import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {
  private errorToastClass = "error-toast";
  private successToastClass = "success-toast";

  constructor(private toastCtrl: ToastController) {}

  errorToast(message: string): void {
    this.createToast(message, this.errorToastClass);
  }

  successToast(message: string): void {
    this.createToast(message, this.successToastClass);
  }

  createToast(message: string,
              cssClass:string,
              duration: number = 3000,
              position: string = "top"
              ) {
    this.toastCtrl.create({ message, cssClass, duration, position }).present();
  }

}
