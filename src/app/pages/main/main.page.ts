import { Component, OnInit } from '@angular/core';
import {User} from '../../models/users';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  user: User;
  email: string;

  constructor(private menu: MenuController, private authService: AuthService, private router: Router) {
    this.menu.enable(true);
    this.email = this.router.getCurrentNavigation().extras.state.email as string;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Using email', this.email);
    this.authService.fetchUser(this.email)
      .subscribe(
        fetched => {
          console.log('Successfully fetched user {}', fetched);
          this.user = fetched;
        },
        error => {
          console.error('Unable to fetch user for email {}', this.email, error);
        }
      );
  }

}
