import { Component, OnInit } from '@angular/core';

export interface Guitar {
  id: number;
  year: number;
  brand: string;
  model: string;
  color: string;
}

const ELEMENT_DATA: Guitar[] = [
  {id: 1, year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, year: 2005, brand: "fender", model: 'model', color: "blue"},
  {id: 1, year: 2005, brand: "fender", model: 'model', color: "blue"},
];

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  displayedColumns: string[] = ['year', 'brand', 'model', 'color'];
  dataSource = ELEMENT_DATA;

  constructor() { 
  }

  ngOnInit() {
  }

}

// import {Component} from '@angular/core';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

// /**
//  * @title Basic use of `<table mat-table>`
//  */
// @Component({
//   selector: 'table-basic-example',
//   styleUrls: ['table-basic-example.css'],
//   templateUrl: 'table-basic-example.html',
// })
// export class TableBasicExample {
//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = ELEMENT_DATA;
// }


