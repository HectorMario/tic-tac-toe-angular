import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerPoppupComponent } from './winner-poppup.component';

describe('WinnerPoppupComponent', () => {
  let component: WinnerPoppupComponent;
  let fixture: ComponentFixture<WinnerPoppupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerPoppupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WinnerPoppupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
