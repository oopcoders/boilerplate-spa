import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { UsersSingle } from './users-single';
import {
  selectApiUserLoading,
  selectApiUserError,
  selectApiUserData,
} from '../../../store/api/api.selectors';

describe('UsersSingle', () => {
  let component: UsersSingle;
  let fixture: ComponentFixture<UsersSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSingle],
      providers: [
        provideRouter([]),

        // ✅ ActivatedRoute stub with snapshot.paramMap.get('id') support
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '123' }),
            },
          },
        },

        // ✅ Store + selector values (important for selectSignal)
        provideMockStore({
          selectors: [
            { selector: selectApiUserData, value: null },
            { selector: selectApiUserLoading, value: false },
            { selector: selectApiUserError, value: null },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersSingle);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
