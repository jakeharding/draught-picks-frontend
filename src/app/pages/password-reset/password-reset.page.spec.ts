import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetPage } from './password-reset.page';
import { FormBuilder, FormGroupDirective, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../../../setup-jest';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { BeerProvider } from '../../services/beer/beer';
import User from '../../models/User';

describe('PasswordResetPage', () => {
  let component: PasswordResetPage;
  let fixture: ComponentFixture<PasswordResetPage>;

  const mockUserProvider = {
    retrieve: jest.fn(() => Promise.resolve({} as User)),
    update: jest.fn(() => Promise.resolve())
  };
  const mockBeerProvider = {
    search: jest.fn()
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetPage, FormGroupDirective ],
      providers: [
        { provide: NavController, useValue: {}},
        { provide: BeerProvider, useValue: mockBeerProvider},
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: NavController, useValue: {}},
        { provide: HttpClient, useValue: {}},
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
