import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyAllDetailsComponent } from './daily-all-details.component';

describe('DailyAllDetailsComponent', () => {
  let component: DailyAllDetailsComponent;
  let fixture: ComponentFixture<DailyAllDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyAllDetailsComponent]
    });
    fixture = TestBed.createComponent(DailyAllDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
