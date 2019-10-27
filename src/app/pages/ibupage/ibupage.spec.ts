import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IbupagePage } from './ibupage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * ibupage.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 *
 * Test IbupagePage.
 */

describe('IbupagePage', () => {
  let fixture: ComponentFixture<IbupagePage>;
  let instance: IbupagePage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [IbupagePage],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbupagePage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the IbupagePage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
