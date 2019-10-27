import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisclaimerPage } from './disclaimer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * disclaimer.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 *
 * Test DisclaimerPage.
 */

describe('DisclaimerPage', () => {
  let fixture: ComponentFixture<DisclaimerPage>;
  let instance: DisclaimerPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [DisclaimerPage],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclaimerPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the DisclaimerPage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
