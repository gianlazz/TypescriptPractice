import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Guitar, Query } from '../types/types';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


const ELEMENT_DATA: Guitar[] = [
  {id: 1, userId: "", year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, userId: "", year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, userId: "", year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, userId: "", year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, userId: "", year: 2005, brand: "fender", model: 'model', color: "blue"},
];

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  displayedColumns: string[] = ['year', 'brand', 'model', 'color', 'id'];
  dataSource = ELEMENT_DATA;

  guitars: Observable<Guitar[]>;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit() {
    this.guitars = this.apollo.watchQuery<Query>({
      query: gql`
        query {
          guitars{
              id
              userId
              year
              brand
              model
              color
          }
      }
      `
    }).valueChanges
      .pipe(map(result => result.data.guitars));

      this.guitars.subscribe(res => console.log(res));
  }

  public gotoGuitars(url) {
    this.router.navigate(url).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}


