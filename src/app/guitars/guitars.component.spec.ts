import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarsComponent } from './guitars.component';

describe('GuitarsComponent', () => {
  let component: GuitarsComponent;
  let fixture: ComponentFixture<GuitarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuitarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuitarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
