import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { UsersList } from './users-list';
import {
  selectApiUsersData,
  selectApUsersLoading,
  selectApiUsersError,
} from '../../../store';

describe('UsersList', () => {
  let component: UsersList;
  let fixture: ComponentFixture<UsersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersList],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectApiUsersData, value: [] },
            { selector: selectApUsersLoading, value: false },
            { selector: selectApiUsersError, value: null },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersList);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ triggers ngOnInit + signals wiring
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
