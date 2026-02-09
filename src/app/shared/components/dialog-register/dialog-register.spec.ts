import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegister } from './dialog-register';
import {MatDialogRef} from '@angular/material/dialog';
import {provideMockStore} from '@ngrx/store/testing';

import {
  selectApiRegisterError,
  selectApiRegisterLoading,
  selectApiRegisterUser,
} from '../../../store';

describe('DialogRegister', () => {
  let component: DialogRegister;
  let fixture: ComponentFixture<DialogRegister>;
  const dialogRef = { close: vi.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRegister],
       providers: [
         { provide: MatDialogRef, useValue: dialogRef },
          provideMockStore({
          selectors: [
            { selector: selectApiRegisterError, value: null },
            { selector: selectApiRegisterLoading, value: false },
            { selector: selectApiRegisterUser, value: null },
          ],
        }),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
