/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripListExcursionsComponent } from './trip-list-excursions.component';

describe('TripListExcursionsComponent', () => {
  let component: TripListExcursionsComponent;
  let fixture: ComponentFixture<TripListExcursionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListExcursionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListExcursionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
