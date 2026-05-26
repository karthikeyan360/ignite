import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModelsComponent } from './models/models.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { TableModule } from 'primeng/table';

import { KeyFilterModule } from 'primeng/keyfilter';
import {
    NumbersOnlyDirective,
    PasteNotAllowedDirective,
    RemoveZeroValueDirective,
    TwoDecimalOnlyDirective,
    ValidactionDirective,
} from '../../directives/index';
// import { MasterService } from "./services/master.service";
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
// import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TeamsComponent } from './teams/teams.component';
import { TeamMembersComponent } from './team-members/team-members.component';
@NgModule({
    declarations: [
        // ModelsComponent,
        RemoveZeroValueDirective,
        TwoDecimalOnlyDirective,
        NumbersOnlyDirective,
        TeamsComponent,
        TeamMembersComponent,
        // CustomerDetailsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        TableModule,
        KeyFilterModule,
        InputNumberModule,
        InputTextareaModule,
        FieldsetModule,
        DropdownModule,
        AutoCompleteModule,

        RouterModule.forChild([
            {
                path: 'teamMembers',
                component: TeamMembersComponent,
            },
        ]),

        ToastModule,
    ],
    // providers: [MasterService],
})
export class MasterModule {}
