import { Component, OnInit, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private apollo: Apollo, 
    private storage: Storage, 
    private router: Router,
    private auth: AuthService
    ) { }

  ngOnInit() {
  }

  async login() {
    const result = await this.auth.login(this.email, this.password);

    if (result) {
      await this.router.navigateByUrl('/');
    }
  }

}
