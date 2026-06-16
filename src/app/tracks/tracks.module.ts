import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { UtilService } from '../shared/util.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { TableModule } from "primeng/table";
import { ClosingDetailsComponent } from './closing-details/closing-details.component';
import { InfoDetailsComponent } from './info-details/info-details.component';
import { TracksService } from './tracks.service';
import { DialogModule } from 'primeng/dialog';

import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
    declarations: [PlanDetailsComponent, ClosingDetailsComponent, InfoDetailsComponent],
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        FirestoreModule,
        RouterModule.forChild([
            {
                path: 'plan',
                component: PlanDetailsComponent,
            },
            {
                path: 'closing',
                component: ClosingDetailsComponent,
            },
            {
                path: 'info',
                component: InfoDetailsComponent,
            },
        ]),
        TableModule,
        DialogModule,
        InputNumberModule
    ],
    providers: [UtilService,TracksService],
})
export class TracksModule { }
