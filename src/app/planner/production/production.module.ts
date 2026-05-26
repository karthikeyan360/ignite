import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderEntryComponent } from './loader-entry/loader-entry.component';
import { RouterModule } from '@angular/router';
import { VisualizerComponent } from "../production/visualizer/visualizer.component";
import { SceneVisualizationComponent } from "../scene-visualization/scene-visualization.component";
import { TypeOneProductionEntryComponent } from './type-one-production-entry/type-one-production-entry.component';


import { FormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { VisualizationService } from 'src/app/services/visualization.service';

import { PanelModule } from 'primeng/panel';
import { ProductionService } from "./services/production.service";
import { TooltipModule } from 'primeng/tooltip';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProductionListsComponent } from './production-lists/production-lists.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TypeTwoProductionEntryComponent } from './type-two-production-entry/type-two-production-entry.component';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
@NgModule({
  declarations: [
    LoaderEntryComponent,
    VisualizerComponent,
    SceneVisualizationComponent,
    TypeOneProductionEntryComponent,
    ProductionListsComponent,
    TypeTwoProductionEntryComponent,
  ],
  providers:[VisualizationService,ProductionService],
  imports: [
    CommonModule,
    PanelModule,
    FormsModule,InputTextModule,ButtonModule,RippleModule,TableModule,AutoCompleteModule,ProgressSpinnerModule,
    ColorPickerModule,
    DropdownModule,
    InputTextareaModule,
    TooltipModule,
    SliderModule,
    StepsModule,
    ProgressBarModule,
 RouterModule.forChild([{
      path:"entry",
      component:VisualizerComponent
    },
    {
      path:"typeOneEntry",
      component:TypeOneProductionEntryComponent,
      data: {breadcrumb: 'Production Type One (with Out Qty *)'},
    },
    {
      path:"typeTwoEntry",
      component:TypeTwoProductionEntryComponent,
      data: {breadcrumb: 'Production Type Two (with  Qty *)'},
    },
    {
      path:"list",
      component:ProductionListsComponent
    }
  
  ])
  ],
})
export class ProductionModule { }
