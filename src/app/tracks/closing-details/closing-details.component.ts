import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppConstant } from 'src/app/app.constant';
import { UtilService } from 'src/app/shared/util.service';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';


@Component({
  selector: 'app-closing-details',
  templateUrl: './closing-details.component.html',
  styleUrls: ['./closing-details.component.scss']
})
export class ClosingDetailsComponent {

  public loading = [false, false, false, false];
  public planGiven: any = null;
  public teamMembersList: any[] = [];
  public prospectName: string = '';
  public planTaken: any = null;
  public dateTime: any = null;
  public Week: string = '';
  public planStatus: any = null;
  public c: any = null;
  public closingStatusLists: any[] = AppConstant.closingStatusLists;
  public buttonName: string = 'Save';
  TeamlLists: any[] = [];
  public planlists: any[] = [];
  private planId: any = null;
  public closeingStatus = null

  constructor(private utilService: UtilService, private firestore: Firestore, private messageService: MessageService) { this.Load(); }
  public async Load() {
    this.loading = [false, false, false, false];
    this.planGiven = null;
    this.teamMembersList = [];
    this.prospectName = '';
    this.planTaken = null;
    this.dateTime = null;
    this.Week = '';
    this.planStatus = null;
    this.c = null;
    this.buttonName = 'Save';
    this.TeamlLists = [];
    this.closeingStatus = this.closingStatusLists[0];
    this.planlists = [];
    this.planId = null;
    // this.teamMembersList = (await this.utilService.GetTeamAndMemberLists() as any).teamMembersList;

    var user: any = localStorage.getItem('User');
    user = JSON.parse(user);

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
        collectionData<any>(q2, { idField: 'id' }).subscribe((data) => {
          this.teamMembersList = data.map((x: any) => {
            let find: any = this.TeamlLists.find((v) => {
              return x.teamId == v.id;
            });
            x.teamName = find.name;
            return x;
          });
        });
      } else {
        this.teamMembersList = [];
      }



      this.loadPlans();
      //load pla
      this.loading[0] = false;
    });


  }

  /**
   * loadPlans
   */
  public loadPlans() {
    try {
      this.planlists = [];
      const plansCollection = collection(
        this.firestore,
        'plans',
      );

      collectionData<any>(plansCollection, { idField: 'id' }).subscribe((data) => {
        this.planlists = data.map((x: any) => {
          let find: any = this.teamMembersList.find((v) => {
            return x.planGiven == v.id;
          });
          x.plamGivenName = find.name;

          let tafind: any = this.teamMembersList.find((v) => {
            return x.planTaken == v.id;
          });
          x.planTakenName = tafind.name;

          let planfind: any = this.closingStatusLists.find((v) => {
            return x.planStatus == v.id;
          });
          x.planStatusName = planfind.name;
          x.dateTime = x.dateTime.toDate();
          return x;
        });
      });


    } catch (error) {

    }

  }
}
