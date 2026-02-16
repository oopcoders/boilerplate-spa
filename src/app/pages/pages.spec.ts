import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

import { Pages } from './pages';
import { selectIsLoggedIn } from '../store';

describe('Pages', () => {
  let component: Pages;
  let fixture: ComponentFixture<Pages>;

  const dialogMock = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pages],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: dialogMock },
        provideMockStore({
          selectors: [{ selector: selectIsLoggedIn, value: false }],
        }),
      ],
    })
      // ✅ Avoid rendering Navigation/Settings (which pull api selectors)
      .overrideComponent(Pages, {
        set: {
          template: `<div>Pages</div>`,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Pages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
