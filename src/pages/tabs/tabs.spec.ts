import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsPage } from './tabs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * tabs.spec.ts
 *
 * Created by jake
 * Created on 2018-11-21
 * 
 * Test TabsPage.
 */

describe('TabsPage', () => {
  let fixture: ComponentFixture<TabsPage>;
  let component: TabsPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TabsPage],
      providers: [
        { provide: NavController, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsPage);
    component = fixture.debugElement.componentInstance;
  });

  it('should initialize the TabsPage', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
