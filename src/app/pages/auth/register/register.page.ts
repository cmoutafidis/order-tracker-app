import { Component, OnInit } from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {LoginPage} from '../login/login.page';
import {NgForm} from '@angular/forms';
import ResponseUtil from '../../../utils/response-util';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  async loginModal() {
    this.dismissRegister();
    const modal = await this.modalController.create({ component: LoginPage });
    return await modal.present;
  }

  register(form: NgForm) {
    const email = form.value.email;
    this.authService.register(form.value.fName, form.value.lName, email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          loginData => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/main', { state: { email } });
          }
        );
        this.alertService.showToast('Success!');
      },
      error => {
        console.log(error);
        this.alertService.showToast(ResponseUtil.toResponse(error.error).userMessage);
      },
      () => {
        console.log('Successfully registered user');
        this.modalController.dismiss();
      }
    );
  }

}
