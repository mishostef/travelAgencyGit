/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnimComponent } from './anim.component';

describe('AnimComponent', () => {
  let component: AnimComponent;
  let fixture: ComponentFixture<AnimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
