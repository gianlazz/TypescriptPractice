import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

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
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

  async login(form: NgForm) {
    const result = await this.authService.login(form.value.email, form.value.password)
    if (result) {
      this.alertService.presentToast("Logged In");
      this.dismissLogin();
      this.navCtrl.navigateRoot('/');
    }
  }

}
