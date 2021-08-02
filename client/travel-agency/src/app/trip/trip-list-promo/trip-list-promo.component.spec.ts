/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripListPromoComponent } from './trip-list-promo.component';

describe('TripListPromoComponent', () => {
  let component: TripListPromoComponent;
  let fixture: ComponentFixture<TripListPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
