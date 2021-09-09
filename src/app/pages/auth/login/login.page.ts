import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {RegisterPage} from '../register/register.page';
import {NgForm} from '@angular/forms';
import ResponseUtil from '../../../utils/response-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  dismissLogin() {
    this.modalController.dismiss();
  }

  async registerModal() {
    this.dismissLogin();
    const modal = await this.modalController.create({
      component: RegisterPage
    });
    return await modal.present();
  }

  login(form: NgForm) {
    const email = form.value.email;
    this.authService.login(email, form.value.password).subscribe(
      data => {
        this.alertService.showToast('Logged In!');
      },
      error => {
        this.alertService.showToast(ResponseUtil.toResponse(error.error).userMessage);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/main', { state: { email } });
      }
    );
  }

}
