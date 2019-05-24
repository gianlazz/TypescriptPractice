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
@Injectable({
  providedIn: 'root'
})
export class LoginPage implements OnInit {

  private apollo: Apollo;
  private email: string = "";
  private password: string = "";

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
    }).subscribe(async ({res, Authorization}) => {
      console.log(Authorization);
      const token = res.get('Authorization');
      const isCompleted = await this.storage.set('token', token);
      await this.router.navigateByUrl('/');


      if (res.data.login !== true) {
        console.log("Login failure");
      } else if (res.data.login === true) {
        console.log("Login successful.");
      }
    });

  }

}
