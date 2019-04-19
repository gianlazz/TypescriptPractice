import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { GuitarsComponent } from './guitars/guitars.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FaceRecognitionComponent } from './face-recognition/face-recognition.component';

const appRoutes: Routes = [
  { path: 'guitar', component: GuitarsComponent },
  { path: '', component: HomeComponent },
  { path: 'face', component: FaceRecognitionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    GuitarsComponent,
    HomeComponent,
    DataTableComponent,
    FaceRecognitionComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // for debugging
      ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'https://lazztechvision.herokuapp.com:8080/graphql' }),
      cache: new InMemoryCache()
    })
  }
}
