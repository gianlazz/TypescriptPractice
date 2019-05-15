import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  private id: number;
  private person: any;

  constructor(private route: ActivatedRoute, private apollo: Apollo) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.apollo.query({
      query: gql`
        query {
          getAllPersons {
            id
            name
            images {
              id
              image
              personDescriptors {
                id
                descriptor
              }
            }
          }
        }
      `
    }).subscribe(({data}) => {
      this.person = data['getAllPersons'];
      console.log(JSON.stringify(this.person));
      console.log(this.person[0].images[0].image);
    });``
  }

}
