import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { UtilService } from '../../shared/util.service';
import { FirestoreModule } from '@angular/fire/firestore';
import { TableModule } from "primeng/table";
import { DailyAllDetailsComponent } from './daily-all-details/daily-all-details.component';


@NgModule({
    declarations: [DailyAllDetailsComponent],
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
                path: 'daily-all-details',
                component: DailyAllDetailsComponent,
            },
           
        ]),
        TableModule
    ],
    providers: [UtilService],
})
export class ReportsModule { }
