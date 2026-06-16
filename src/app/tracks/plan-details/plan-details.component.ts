import { Component } from '@angular/core';
import { UtilService } from '../../shared/util.service';
import { addDoc, collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { AppConstant } from 'src/app/app.constant';
import { MessageService } from 'primeng/api';
import { doc, updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss']
})
export class PlanDetailsComponent {

  public loading = [false, false, false, false];
  public planGiven: any = null;
  public teamMembersList: any[] = [];
  public prospectName: string = '';
  public planTaken: any = null;
  public dateTime: any = null;
  public Week: string = '';
  public planStatus: any = null;
  public c: any = null;
  public planStatusLists: any[] = AppConstant.planStatusLists;
  public buttonName: string = 'Save';
  TeamlLists: any[] = [];
  public planlists: any[] = [];
  private planId: any = null;

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
    this.planStatus = this.planStatusLists[0];
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

  public chageDateTime(event: any) {
    if (this.dateTime) {
      let data = this.utilService.getCurrentWeekDetails(this.dateTime);
      // this.Week = `Week ${data.weekNumber} (${data.weekStart} - ${data.weekEnd})`;
      this.Week = `Week - ${data.weekNumber}`;

      console.log(data);
    } else {
      this.Week = '';
    }
  }
  public save() {
    try {
      if (this.planGiven == null || this.prospectName === '' || this.planTaken == null || this.dateTime == null || this.planStatus == null) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill all the details',
        });
      } else {
        this.loading[1] = true;

        if (this.planId) {
          //update code here  

          //update to firestore
          this.updatePlan();
        } else {
          //save code here 
          this.savePlan();
        }


      }


    } catch (error) {

    }
  }
  public async savePlan() {
    try {
      let data = {
        planGiven: this.planGiven.id,
        prospectName: this.prospectName,
        planTaken: this.planTaken.id,
        dateTime: this.dateTime,
        week: this.Week,
        weekNumber: this.Week.split('-')[1].trim(),
        planStatus: this.planStatus.id,
        closeingStatus: 0,
        closeingUpdates :  [],
        amount: null,
        uv:null,
        createdAt: new Date(),
        createdUser: JSON.parse(localStorage.getItem('User') || '{}').uid,
      };
      console.log(data);
      //save to firestore
      await addDoc(collection(this.firestore, 'plans'), data).then((docRef) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Plan saved successfully',
        });
      })
        .catch((error) => {
          console.error('Error adding document: ', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while saving plan',
          });
        });

      this.Load();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error while saving plan',
      });
    } finally {
      this.loading[1] = false;
    }
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

          let planfind: any = this.planStatusLists.find((v) => {
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


  public ViewProduct(product: any) {
    this.planGiven = this.teamMembersList.find((x) => x.id == product.planGiven);
    this.prospectName = product.prospectName;
    this.planTaken = this.teamMembersList.find((x) => x.id == product.planTaken);
    this.dateTime = product.dateTime;
    this.Week = product.Week;
    this.planStatus = this.planStatusLists.find((x) => x.id == product.planStatus);
    this.buttonName = 'Update';
    this.chageDateTime(this.dateTime);
    this.planId = product.id;
  }

  public async updatePlan() {
    try {
      let data = {
        planGiven: this.planGiven.id,
        prospectName: this.prospectName,
        planTaken: this.planTaken.id,
        dateTime: this.dateTime,
        week: this.Week,
        weekNumber: this.Week.split('-')[1].trim(),
        planStatus: this.planStatus.id,
        updatedAt: new Date(),
        updatedUser: JSON.parse(localStorage.getItem('User') || '{}').uid,
      };
      console.log(data);
      //update to firestore
      const userRef = doc(this.firestore, `plans/${this.planId}`);
      await updateDoc(userRef, data).then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Plan updated successfully',
        });
      })
        .catch((error) => {
          console.error('Error updating document: ', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error while updating plan',
          });
        });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error while updating plan',
      });
    } finally {
      this.Load();
    }
  }
}


