/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripListNewComponent } from './trip-list-new.component';

describe('TripListNewComponent', () => {
  let component: TripListNewComponent;
  let fixture: ComponentFixture<TripListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
