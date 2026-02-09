import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSingle } from './users-single';
import { provideMockStore } from '@ngrx/store/testing';

describe('UsersSingle', () => {
  let component: UsersSingle;
  let fixture: ComponentFixture<UsersSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersSingle],
      providers: [
        provideMockStore(), // ✅ provides Store
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersSingle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
