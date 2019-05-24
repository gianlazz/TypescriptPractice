import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private apollo: Apollo;
  private username: string = "";
  private email: string = "";
  private password: string = "";

  constructor(apollo: Apollo, private storage: Storage, private router: Router) {
    this.apollo = apollo;
  }

  ngOnInit() {
  }

  async register() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          register(data: {
            username: "${this.username}",
            email: "${this.email}",
            password: "${this.password}"
          })
        }
      `
    }).subscribe(async res => {
      console.log(res);
      const token = res.data.register;

      if (token) {
        console.log("Registration failure");
        await this.storage.set('token', token);
        await this.router.navigateByUrl('/');
      } else {
        console.log("Registration successful.");
      }
    });

}

}
