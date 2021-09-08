import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController, NavController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {RegisterPage} from "../auth/register/register.page";
import {LoginPage} from "../auth/login/login.page";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }
  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }

}
