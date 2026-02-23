import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { AuthBootstrapService } from './auth-bootstrap.service';
import { TokenService } from './token.service';
import { JwtService } from './jwt.service';
import { AuthApi } from './auth-api.service';
import { AuthRefreshService } from './auth-refresh.service';

describe('AuthBootstrapService', () => {
  let service: AuthBootstrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),

        // Minimal mocks for DI
        {
          provide: TokenService,
          useValue: {
            getTokens: () => ({ accessToken: null, refreshToken: null }),
            getAccessToken: () => null,
            getRefreshToken: () => null,
            clear: () => { },
          },
        },
        {
          provide: JwtService,
          useValue: {
            isProbablyJwt: () => false,
            isExpired: () => false,
          },
        },
        {
          provide: AuthApi,
          useValue: {
            me: () => of({}), // not used in "created" test, but needed for DI safety
          },
        },
        {
          provide: AuthRefreshService,
          useValue: {
            refreshOnce: () => of({ accessToken: 'A', refreshToken: 'R' }),
          },
        },
      ],
    });

    service = TestBed.inject(AuthBootstrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});