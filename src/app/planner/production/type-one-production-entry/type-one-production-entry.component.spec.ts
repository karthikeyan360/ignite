import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOneProductionEntryComponent } from './type-one-production-entry.component';

describe('TypeOneProductionEntryComponent', () => {
  let component: TypeOneProductionEntryComponent;
  let fixture: ComponentFixture<TypeOneProductionEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOneProductionEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOneProductionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
