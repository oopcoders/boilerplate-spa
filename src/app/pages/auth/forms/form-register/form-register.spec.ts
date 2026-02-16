import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { FormRegister } from './form-register';
import {
  selectApiRegisterError,
  selectApiRegisterLoading,
  selectApiRegisterUser,
} from '../../../../store';

describe('FormRegister', () => {
  let component: FormRegister;
  let fixture: ComponentFixture<FormRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegister],
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

    fixture = TestBed.createComponent(FormRegister);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ✅ triggers ngOnInit + bindings
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
