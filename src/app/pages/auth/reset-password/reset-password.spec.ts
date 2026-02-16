import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';

import { ResetPassword } from './reset-password';
import {
  selectApiForgotPasswordLoading,
  selectApiForgotPasswordError,
  selectApiForgotPasswordData,
  selectApiResetPasswordLoading,
  selectApiResetPasswordError,
  selectApiResetPasswordData,
} from '../../../store/api/api.selectors';

describe('ResetPassword', () => {
  let component: ResetPassword;
  let fixture: ComponentFixture<ResetPassword>;

  const snackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [
        provideRouter([]),

        // ✅ ActivatedRoute with query params (no email/token => request mode)
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(convertToParamMap({})),
          },
        },

        // ✅ Store selectors used by selectSignal(...)
        provideMockStore({
          selectors: [
            { selector: selectApiForgotPasswordLoading, value: false },
            { selector: selectApiForgotPasswordError, value: null },
            { selector: selectApiForgotPasswordData, value: null },

            { selector: selectApiResetPasswordLoading, value: false },
            { selector: selectApiResetPasswordError, value: null },
            { selector: selectApiResetPasswordData, value: null },
          ],
        }),

        // ✅ Snack bar
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ runs constructor subscriptions + effects
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
