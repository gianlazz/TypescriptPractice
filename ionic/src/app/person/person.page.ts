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
  private renaming: boolean;
  private newName: string;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.renaming = false;
  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.apollo.query({
      query: gql`
      query {
        getPerson(id: ${this.id}) {
          id
          name
          images {
            id
            image
            savedAtTimestamp
          }
        }
      }
      `
    }).subscribe(({data}) => {
      this.person = data['getPerson'];
      console.log(JSON.stringify(this.person));
      console.log(this.person[0].images[0].image);
    });
  }

  startRenaming() {
    this.renaming = true;
  }

  stopRenaming() {
    this.renaming = false;
  }

  async rename() {
    this.apollo.mutate({
      mutation: gql`
      mutation {
        renamePerson(personId: ${this.id}, newName: "${this.newName}")
      }
      `
    }).subscribe(({data}) => {
      if (data.renamePerson === true) {
        this.person.name = this.newName;
      } else {
        console.log("Rename failed.");
      }
    });
  }

}
