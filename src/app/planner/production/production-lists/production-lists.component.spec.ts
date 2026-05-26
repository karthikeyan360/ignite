import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionListsComponent } from './production-lists.component';

describe('ProductionListsComponent', () => {
  let component: ProductionListsComponent;
  let fixture: ComponentFixture<ProductionListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
