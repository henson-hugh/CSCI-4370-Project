import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingTimeComponent } from './showing-time.component';

describe('ShowingTimeComponent', () => {
  let component: ShowingTimeComponent;
  let fixture: ComponentFixture<ShowingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowingTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
