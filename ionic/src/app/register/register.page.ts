import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
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

  async register() {
    const result = await this.auth.register(this.username, this.email, this.password);

    if (result) {
      await this.router.navigateByUrl('/');
    }
  }

}
