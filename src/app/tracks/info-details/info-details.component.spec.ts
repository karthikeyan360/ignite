import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetailsComponent } from './info-details.component';

describe('InfoDetailsComponent', () => {
  let component: InfoDetailsComponent;
  let fixture: ComponentFixture<InfoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoDetailsComponent]
    });
    fixture = TestBed.createComponent(InfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
