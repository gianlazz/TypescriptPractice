import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Guitar, Query, Mutation } from '../types/types';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {
  displayedColumns: string[] = ['year', 'brand', 'model', 'color', 'id'];
  guitars: Observable<Guitar[]>;
  guitar: Guitar;

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit() {
    this.getAllGuitars();
  }

  public getAllGuitars(){
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

  public addGuitar(form: NgForm){
    console.log('Form data: ' + JSON.stringify(form.value));
    let guitar = form.value;
    console.log('Adding guitar.');
    this.apollo.mutate<Mutation>({
      mutation: gql`
        mutation{
            createGuitar(
              userId: "1"
              brand: "${ guitar.brand }"
              model: "${ guitar.model }"
              year: ${ guitar.year }
              color: "${ guitar.color }"
            ){
              id
              userId
              brand
              model
              year
              color
            }
          }
      `
    }).subscribe(res => {
      this.getAllGuitars();
      console.log(res);
    })
  }

  public deleteGuitar(id: number){
    console.log(`Deleting guitar: ${id}`);
    this.apollo.mutate<Mutation>({
      mutation: gql`
        mutation {
          deleteGuitar(id: ${ id })
        }
      `
    }).subscribe(res => {
      this.getAllGuitars();
      console.log(res);
    });
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


