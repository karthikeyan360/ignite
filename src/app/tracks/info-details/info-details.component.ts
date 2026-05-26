import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.scss']
})
export class InfoDetailsComponent {
infolists: any[] = [];
teamMemberId: any;


  constructor(private utilService: UtilService, private firestore: Firestore, private messageService: MessageService) { this.Load(); }
  TeamlLists: any[] = [];
  date: any;
  teamMembersList: any[] =[];
  loading: any;
  Week!: string;
  
  aResponse: any;
  bResponse: any;
  cResponse: any;
  newContact: any;
  buttonName: string | undefined;



  public async Load() {
    this.loading = [false, false, false, false];
    this.teamMembersList = [];
    this.date = new Date();
    this.chageDateTime(this.date);
    this.Week = '';
    this.aResponse = null;
    this.bResponse = null;
    this.cResponse = null;
    this.newContact = null; 

    this.buttonName = 'Save';

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
            let find: any = this.TeamlLists?.find((v) => {
              return x.teamId == v.id;
            });
            x.teamName = find?.name;
            return x;
          });
        });
      } else {
        this.teamMembersList = [];
      }


     this.loadInfos();

      //load pla
      this.loading[0] = false;
    });


  }

  public chageDateTime(event: any) {
    if (this.date) {
      let data = this.utilService.getCurrentWeekDetails(this.date);
      // this.Week = `Week ${data.weekNumber} (${data.weekStart} - ${data.weekEnd})`;
      this.Week = `Week - ${data.weekNumber}`;

      console.log(data);
    } else {
      this.Week = '';
    }
  }

  public save() {
    try {
      this.loading[1] = true;
      this.savePlan();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error while saving info',
      });
    } finally {
      this.loading[1] = false;
    }
  }

   public async savePlan() {
      try {
        let data = {
          teamMemberId: this.teamMemberId.id,
          date: this.date,
          aResponse: this.aResponse,
          bResponse: this.bResponse,
          cResponse: this.cResponse,
          newContact: this.newContact,
          week: this.Week,
        weekNumber: this.Week.split('-')[1].trim(),
        createdAt: new Date(),
        createdUser: JSON.parse(localStorage.getItem('User') || '{}').uid,
        };
        console.log(data);
        //save to firestore
        await addDoc(collection(this.firestore, 'infos'), data).then((docRef) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Info saved successfully',
          });
        })
          .catch((error) => {
            console.error('Error adding document: ', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error while saving info',
            });
          });
  
        this.Load();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error while saving info',
        });
      } finally {
        this.loading[1] = false;
      }
    }

     /**
     * loadInfos  
     */
      public loadInfos() {
        try {
          this.infolists = [];
          const Collection = collection(
            this.firestore,
            'infos',
          );
    
          collectionData<any>(Collection, { idField: 'id' }).subscribe((data) => {
            this.infolists = data.map((x: any) => {
              let find: any = this.teamMembersList.find((v) => {
                return x.teamMemberId == v.id;
              });
              x.name = find.name;
    
              x.date = x.date.toDate();
              return x;
            });
          });
    
    
        } catch (error) {
    
        }
    
      }
}
