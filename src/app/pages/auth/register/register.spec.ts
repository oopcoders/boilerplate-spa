import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { Register } from './register';
import {
  selectApiRegisterError,
  selectApiRegisterLoading,
  selectApiRegisterUser,
} from '../../../store'; // adjust if your barrel path differs

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        provideRouter([]),

        provideMockStore({
          selectors: [
            { selector: selectApiRegisterError, value: null },
            { selector: selectApiRegisterLoading, value: false },
            { selector: selectApiRegisterUser, value: null },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
