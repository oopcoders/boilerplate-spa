import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogLogin } from './dialog-login';

describe('DialogLogin', () => {
  let component: DialogLogin;
  let fixture: ComponentFixture<DialogLogin>;

  const dialogRefMock = jasmine.createSpyObj<MatDialogRef<DialogLogin>>('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLogin],
      providers: [{ provide: MatDialogRef, useValue: dialogRefMock }],
    })
      // ✅ isolate from FormLogin and store/router concerns
      .overrideComponent(DialogLogin, {
        set: { template: `<button (click)="close()">Close</button>` },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DialogLogin);
    component = fixture.componentInstance;

    dialogRefMock.close.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close() should close the dialog', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledTimes(1);
  });
});
