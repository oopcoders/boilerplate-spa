import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogLogin } from './dialog-login';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectApiLoginError, selectApiLoginLoading, selectIsLoggedIn } from '../../../../store';

describe('DialogLogin', () => {
  let component: DialogLogin;
  let fixture: ComponentFixture<DialogLogin>;
  let store: MockStore;
  const dialogRef = { close: vi.fn() };
  let isLoggedInSel: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogLogin],
      providers: [
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'Test', bio: 'Test bio' } },
        provideMockStore(),
      ],
    })
      .compileComponents();

    store = TestBed.inject(MockStore);

    // ✅ Override every selector used by the component/template
    store.overrideSelector(selectApiLoginError, null);
    store.overrideSelector(selectApiLoginLoading, false);
    isLoggedInSel = store.overrideSelector(selectIsLoggedIn, false);

    fixture = TestBed.createComponent(DialogLogin);
    component = fixture.componentInstance;

    dialogRef.close.mockClear();
    // runs ngOnInit + template bindings + async pipe subscriptions
    fixture.detectChanges();

    // stash for test
    (component as any)._isLoggedInSel = isLoggedInSel;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close...', async () => {
    isLoggedInSel.setResult(true);
    store.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(dialogRef.close).toHaveBeenCalledTimes(1);
  });
});
