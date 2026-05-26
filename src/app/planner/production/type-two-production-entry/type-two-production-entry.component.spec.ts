import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTwoProductionEntryComponent } from './type-two-production-entry.component';

describe('TypeTwoProductionEntryComponent', () => {
  let component: TypeTwoProductionEntryComponent;
  let fixture: ComponentFixture<TypeTwoProductionEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeTwoProductionEntryComponent]
    });
    fixture = TestBed.createComponent(TypeTwoProductionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
