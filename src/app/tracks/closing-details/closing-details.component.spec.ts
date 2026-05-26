import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingDetailsComponent } from './closing-details.component';

describe('ClosingDetailsComponent', () => {
  let component: ClosingDetailsComponent;
  let fixture: ComponentFixture<ClosingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClosingDetailsComponent]
    });
    fixture = TestBed.createComponent(ClosingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
