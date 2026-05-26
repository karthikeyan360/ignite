import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
              { label: 'Team Members', icon: 'pi pi-fw pi-home', routerLink: ['/master/teamMembers'] },
            // {
            //     label: 'Master',
            //     items: [
            //         { label: 'Team Members', icon: 'pi pi-fw pi-home', routerLink: ['/master/teamMembers'] }
            //     ]
            // },
            { label: 'Plan Tracks', icon: 'pi pi-fw pi-map-marker', routerLink: ['/tracks/plan'] },
            { label: 'Closing Tracks', icon: 'pi pi-fw pi-map-marker', routerLink: ['/tracks/closing'] },
            { label: 'Info Tracks', icon: 'pi pi-fw pi-map-marker', routerLink: ['/tracks/info'] },
            { label: 'Reports', icon: 'pi pi-fw pi-file', routerLink: ['/reports/daily-all-details'] }
            
        ];
    }
}
 