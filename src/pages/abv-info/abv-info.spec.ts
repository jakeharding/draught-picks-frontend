import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbvInfoPage } from './abv-info';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/**
 * abv-info.spec.ts
 *
 * Created by jake
 * Created on 11/18/18
 * 
 * Test the ABV info page.
 */

describe('AbvInfoPage', () => {
  let fixture: ComponentFixture<AbvInfoPage>;
  let instance: AbvInfoPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AbvInfoPage],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbvInfoPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the AbvInfoPage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
