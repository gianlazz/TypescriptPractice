import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AnySoaRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;

  constructor(
    private apollo: Apollo,
    private storage: Storage
  ) { }

  async login(email: string, password: string): Promise<string> {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          login(password: "${password}", email: "${email}")
        }
      `
    }).toPromise();

    console.log(result);
    this.token = result.data.login;

    if (this.token) {
      console.log("Login successful.");
      await this.storage.set('token', this.token);
      this.isLoggedIn = true;
    } else {
      console.log("Login failure");
    }

    return result;
  }

  async logout() {
    await this.storage.remove("token");
    this.isLoggedIn = false;
    delete this.token;
  }

  async register(username: string, email: string, password: string): Promise<string> {
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          register(data: {
            username: "${username}",
            email: "${email}",
            password: "${password}"
          })
        }
      `
    }).toPromise();

    console.log(result);
    this.token = result.data.register;
    return this.token;
  }

  async user(): Promise<any> {
    const result = await this.apollo.query({
      query: gql`
        query {
          me { 
            id
            username
            email
          }
        }
      `
    }).toPromise();

    console.log(result);

    return result.data['me'];
  }

  async getToken(): Promise<string> {
    try {
      this.token = await this.storage.getItem('token')

      if(this.token != null) {
        this.isLoggedIn=true;
      } else {
        this.isLoggedIn=false;
      }

      return this.token;
    } catch (error) {
      this.token = null;
      this.isLoggedIn=false;
    }
  }
}
