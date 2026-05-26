import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizerComponent } from './visualizer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VisualizerComponent', () => {
  let component: VisualizerComponent;
  let fixture: ComponentFixture<VisualizerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizerComponent],
      
     
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hint if no solution selected', () => {
    const noSolutionHint = debugElement.query(By.css('.no-solution-selected-hint'));
    expect(noSolutionHint).toBeTruthy();
  });

  it('should display solution if one selected', async () => {
   
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.detectChanges();

    const sceneVisualization = debugElement.query(By.css('app-scene-visualization'));
    expect(sceneVisualization).toBeTruthy();
  });
});
