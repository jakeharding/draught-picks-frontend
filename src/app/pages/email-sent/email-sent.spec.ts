/**
 * email-sent.spec.ts
 *
 * Created by jake
 * Created on 10/27/18
 *
 * The page seen after a confirmation email has been sent.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailSentPage } from './email-sent';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController } from '@ionic/angular';

describe('EmailSentPage', () => {
  let fixture: ComponentFixture<EmailSentPage>;
  let instance: EmailSentPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [EmailSentPage],
      providers: [
        { provide: NavController, useValue: {push: jest.fn()} }
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSentPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should initialize the component', () => {
    expect.assertions(1);
    expect(instance).toBeDefined();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
