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


