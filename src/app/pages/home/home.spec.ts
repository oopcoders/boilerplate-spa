import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { Home } from './home';
import { Header } from '../../shared/components/header/header';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, Header],
      providers: [
        provideMockStore({
          initialState: {
            api: {
              login: {
                loading: false,
                user: null,
                error: null,
              },
            },
          },
        }), // ✅ provides Store
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
