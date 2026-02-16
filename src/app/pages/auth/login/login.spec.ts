import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { Login } from './login';

import {
  selectApiLoginError,
  selectApiLoginLoading,
  selectIsLoggedIn,
} from '../../../store'; // <-- adjust if your import path differs

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),

        provideMockStore({
          selectors: [
            { selector: selectApiLoginError, value: null },
            { selector: selectApiLoginLoading, value: false },
            { selector: selectIsLoggedIn, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
