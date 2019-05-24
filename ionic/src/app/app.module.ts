import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { SERVER_URL } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage';

import { setContext } from "apollo-link-context";


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {

    // boost.create({
    //   uri: SERVER_URL,
    //   request: async operation => {
    //     operation.setContext({
    //       headers: {
    //         Authorization: localStorage.getItem('token')
    //       }
    //     })
    //   }
    // });

    const apolloLink = httpLink.create({ 
      uri: SERVER_URL,
      withCredentials: true
    });

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: {
            ...headers,
            Authorization: headers.append('Authorization', `Bearer ${token}`)
          }
        };
      }
    });

    apollo.create({
      link: auth.concat(apolloLink),
      cache: new InMemoryCache(),
    })
  }
}
