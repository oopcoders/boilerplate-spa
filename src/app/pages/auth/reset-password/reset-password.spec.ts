import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

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
  let fixture: ComponentFixture<ResetPassword>;
  let store: MockStore<any>;

  const LOGIN_URL = '/auth/login';
  const snackBarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [
        provideRouter([]),

        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(
              convertToParamMap({
                email: 'test@test.com',
                token: 'TOKEN',
              })
            ),
          },
        },

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

        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore) as MockStore<any>;

    fixture = TestBed.createComponent(ResetPassword);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  function applyStoreUpdate(): void {
    store.refreshState();
    fixture.detectChanges();
  }

  describe('When reset password succeeds', () => {
    let router: Router;

    let loadingSel: any;
    let errorSel: any;
    let dataSel: any;

    beforeEach(() => {
      router = TestBed.inject(Router);
      spyOn(router, 'navigateByUrl');

      loadingSel = store.overrideSelector(selectApiResetPasswordLoading, false);
      errorSel = store.overrideSelector(selectApiResetPasswordError, null);
      dataSel = store.overrideSelector(selectApiResetPasswordData, null);

      // started
      loadingSel.setResult(true);
      applyStoreUpdate();

      // finished successfully
      dataSel.setResult({ ok: true } as any);
      errorSel.setResult(null);
      loadingSel.setResult(false);
      applyStoreUpdate();
    });

    it(`should redirect to ${LOGIN_URL}`, () => {
      expect(router.navigateByUrl).toHaveBeenCalledWith(LOGIN_URL);
    });
  });
});
