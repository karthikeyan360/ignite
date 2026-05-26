import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
    Firestore,
    collection,
    collectionData,
    addDoc,
    query,
    where,
} from '@angular/fire/firestore';

@Component({
    selector: 'app-team-members',
    templateUrl: './team-members.component.html',
    styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent {
    public loading = [false, false, false, false];
    public name: string = '';
    public desc: string = '';
    public buttonName: string = 'Save';
    private id: number = 0;
    public TeamlLists: any[] = [];
    public team: any = null;
    public baNo: string = '';
    public teamMembersList: any[] = [];
teamMemberId: any;
    constructor(
        private messageService: MessageService,
        private firestore: Firestore,
    ) {
        this.Load();
    }

    /**
     * Load
     */
    public Load() {
        try {
            var user: any = localStorage.getItem('User');
            user = JSON.parse(user);
            this.loading = [false, false, false, false];
            this.loading[0] = true;
            this.name = '';
            this.desc = '';
            this.baNo = '';
            this.buttonName = 'Save';
            this.id = 0;
            this.TeamlLists = [];
            this.teamMembersList = [];

            const teamCollection = collection(this.firestore, 'teams');
            const q = query(
                teamCollection,
                where('accessUsers', 'array-contains', user.email),
            );

            collectionData(q, { idField: 'id' }).subscribe((data) => {
                
                this.TeamlLists = data;
                var teamIds = data.map((x) => x.id);
                if (teamIds.length > 0) {
                    const membersCollection = collection(
                        this.firestore,
                        'teamMembers',
                    );
                    const q2 = query(
                        membersCollection,
                        where('teamId', 'in', teamIds),
                    );
                    collectionData(q2, { idField: 'id' }).subscribe((data) => {
                        this.teamMembersList = data.map((x: any) => {
                            let find = this.TeamlLists.find((v) => {
                                return x.teamId == v.id;
                            });
                            x.teamName = find.name;
                            return x;
                        });
                    });
                } else {
                    this.teamMembersList = [];
                }
                this.loading[0] = false;
            });
        } catch (error) {
            this.loading[0] = false;
        }
    }

    /**
     * Save
     * */

    public save() {
        if (this.team == null) {
            this.loading[1] = false;
            return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please select team',
            });
        }
        if (this.name.trim() == '') {
            this.loading[1] = false;
            return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter name',
            });
        }
        if (this.baNo.trim() == '') {
            this.loading[1] = false;
            return this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please enter IR No',
            });
        }

        // duplication check irNo in same team
        const membersCollection = collection(this.firestore, 'teamMembers');
        const q = query(
            membersCollection,
            where('baNo', '==', this.baNo.trim()),
        );
        collectionData(q).subscribe((data) => {
            if (data.length > 0) {
                this.loading[1] = false;
                return this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'IR No already exists',
                });
            } else {
                this.saveTeamMember();
            }
        });
    }

    private async saveTeamMember() {
        try {
            this.loading[1] = true;

            const membersRef = collection(this.firestore, 'teamMembers');
            addDoc(membersRef, {
                name: this.name,
                desc: this.desc,
                teamId: this.team.id,
                baNo: this.baNo,
                active: true,
                createdAt: new Date(),
                createdUser: JSON.parse(localStorage.getItem('User') || '{}')
                    .uid,
            }).then((response) => {
                this.loading[1] = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',

                    detail: 'Team member added successfully.',
                });
                this.Load();
            });
        } catch (error) {
            this.loading[1] = false;
            console.log(error);
        }
    }
}
