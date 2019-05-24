import { Component, OnInit, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private apollo: Apollo;
  email: string = "";
  password: string = "";

  constructor(apollo: Apollo, private storage: Storage, private router: Router) {
    this.apollo = apollo;
  }

  ngOnInit() {
  }

  async login() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          login(password: "${this.password}", email: "${this.email}")
        }
      `
    }).subscribe(async (res) => {
      console.log(res);
      const token = res.data.login;

      if (token) {
        console.log("Login successful.");
        await this.storage.set('token', token);
        await this.router.navigateByUrl('/');
      } else {
        console.log("Login failure");
      }
    });

  }

}
