import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IbuInfoPage } from './ibu-info.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * ibupage.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 *
 * Test IbuInfoPage.
 */

describe('IbuInfoPage', () => {
  let fixture: ComponentFixture<IbuInfoPage>;
  let instance: IbuInfoPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [IbuInfoPage],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbuInfoPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the IbuInfoPage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
