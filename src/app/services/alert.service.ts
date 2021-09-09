import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) { }

  async showToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'dark'
    });
    toast.present();
  }

}
