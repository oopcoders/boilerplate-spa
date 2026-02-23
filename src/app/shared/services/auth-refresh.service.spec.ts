import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { AuthRefreshService } from './auth-refresh.service';
import { TokenService } from './token.service';
import { AuthApi } from './auth-api.service';

describe('AuthRefreshService', () => {
  let service: AuthRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),

        // Minimal mocks so DI can create the service
        {
          provide: TokenService,
          useValue: {
            getRefreshToken: () => 'refresh-token',
            setTokens: () => { },
          },
        },
        {
          provide: AuthApi,
          useValue: {
            refresh: () => of({ accessToken: 'new-access', refreshToken: 'new-refresh' }),
          },
        },
      ],
    });

    service = TestBed.inject(AuthRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});