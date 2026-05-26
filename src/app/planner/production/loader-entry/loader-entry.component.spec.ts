import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderEntryComponent } from './loader-entry.component';

describe('LoaderEntryComponent', () => {
  let component: LoaderEntryComponent;
  let fixture: ComponentFixture<LoaderEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
