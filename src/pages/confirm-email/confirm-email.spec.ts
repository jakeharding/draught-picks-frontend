/**
 * confirm-email.spec.ts
 *
 * Created by jake
 * Created on 10/21/18
 */

import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmEmailPage } from "./confirm-email";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NavController } from "ionic-angular";

describe('ConfirmEmailPage', () => {

  let fixture: ComponentFixture<ConfirmEmailPage>;
  let instance: ConfirmEmailPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ConfirmEmailPage],
      providers: [
        { provide: NavController, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEmailPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the ConfirmEmailPage', () => {
    expect(instance).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
