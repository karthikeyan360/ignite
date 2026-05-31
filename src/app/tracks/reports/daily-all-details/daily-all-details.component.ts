import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, where } from 'firebase/firestore';
import { MessageService } from 'primeng/api';
import { UtilService } from 'src/app/shared/util.service';
import { TracksService } from '../../tracks.service';
import * as _ from 'lodash';

import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-daily-all-details',
  templateUrl: './daily-all-details.component.html',
  styleUrls: ['./daily-all-details.component.scss']
})
export class DailyAllDetailsComponent {
  Week: { weekNumber: number; weekStart: Date | null; weekEnd: Date | null; } | undefined;
  teamMembersList: any[] = [];
  TeamlLists: any;
  infoTrackList: any[] = [];


  constructor(private utilService: UtilService, private firestore: Firestore, private messageService: MessageService, private tracksService: TracksService) {
    this.chageDateTime(this.date);



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
          var teamMembersIds: any[] = [];
          this.teamMembersList = data.map((x: any) => {
            let find: any = this.TeamlLists?.find((v: any) => {
              return x.teamId == v.id;
            });
            x.teamName = find?.name;
            teamMembersIds.push(x.id)
            return x;
          });

          this.loadInfoTrack(teamMembersIds);
        });


      } else {
        this.teamMembersList = [];
      }


    });

  }
  rows: any[] = [];
  date = new Date();

  subHeaders = ['T/In', 'A', 'B', 'PL', 'R2'];

  days = [
    'saturday',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday'
  ];

  columns: string[] = [];

  footerColumns: any[] = new Array(38);

  ngOnInit(): void {




  }

  exportPDF() {
    const data = document.getElementById('content');
    html2canvas(data!).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('exported-file.pdf'); // Save the generated PDF
    });
  }

  private loadReport() {


    // Generate dynamic columns
    // this.days.forEach(day => {
    //   this.subHeaders.forEach(sub => {
    //     this.columns.push(`${day}_${sub}`);
    //   });
    // });

    console.log('Generated Columns:', this.columns);


    // Generate 30 rows
    // this.rows = this.teamMembersList.map((member: any) => {
    //   const row: any = {
    //     irName: member.name,
    //     infoPL: '',
    //     rule2: '',
    //     r2: ''
    //   };

    //   this.columns.forEach(col => {
    //     row[col] = '';
    //   });

    //   return row;
    // });


    // console.log('Generated Rows:', this.rows);
  }

  public chageDateTime(event: any) {
    if (this.date) {
      let data = this.utilService.getCurrentWeekDetails(this.date);
      // this.Week = `Week ${data.weekNumber} (${data.weekStart} - ${data.weekEnd})`;
      this.Week = data;
      console.log(data);
    } else {
      this.Week = { weekNumber: 0, weekStart: null, weekEnd: null };
    }
  }

  private loadInfoTrack(teamMembersIds: any[]) {
    try {
      this.columns = []; // Clear existing columns before generating new ones
      this.days.forEach(day => {
        this.subHeaders.forEach(sub => {
          this.columns.push(`${day}_${sub}`);
        });
      });
      this.tracksService
        .getInfoTracksByDate(
          teamMembersIds,
          // ensure non-null Dates: fall back to this.date if weekStart/weekEnd are null/undefined
          (this.Week?.weekStart ?? this.date) as Date,
          (this.Week?.weekEnd ?? this.date) as Date
        )
        .subscribe(data => {
          this.infoTrackList = data;
          console.log('teamMembersIds:', teamMembersIds);
          console.log('Info Tracks:', data);
          let groupedTeamMembers = _.groupBy(data, 'teamMemberId');
          console.log('Grouped Team Members:', groupedTeamMembers);

          this.rows = [];
          _.forEach(teamMembersIds, (keyIds: any) => {
            let findMemebers = groupedTeamMembers[keyIds];
            let memberInfo = this.teamMembersList.find(member => member.id === keyIds);
            let row: any = {
              irName: memberInfo ? memberInfo.name : 'Unknown Member',
              infoPL: '',
              rule2: '',
              r2: ''
            };


            if (findMemebers && findMemebers.length > 0) {
              this.days.forEach(day => {
                this.subHeaders.forEach(sub => {

                  _.forEach(findMemebers, (track: any) => {
                    let trackDate = track.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
                    let trackDay = trackDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                    let trackSubHeader = sub.toLowerCase();

                    if (trackDay === day) {
                      // console.log(`Match found for teamMemberId: ${keyIds}, Day: ${day}, SubHeader: ${sub}`);
                      // ['T/In', 'A', 'B', 'PL', 'R2'];
                      if (sub === 'PL') {
                        row[`${day}_${sub}`] = '';
                      } else if (sub === 'R2') {
                        row[`${day}_${sub}`] = track.newContact || '';
                      } else if (sub === 'A') {
                        row[`${day}_${sub}`] = track.aResponse || '';
                      } else if (sub === 'B') {
                        row[`${day}_${sub}`] = _.add(_.isNull(track.bResponse) ? 0 : parseInt(track.bResponse), _.isNull(track.cResponse) ? 0 : parseInt(track.cResponse)) || '';
                      } else if (sub === 'T/In') {
                        row[`${day}_${sub}`] = (_.add((_.add(_.isNull(track.aResponse) ? 0 : parseInt(track.aResponse), _.isNull(track.bResponse) ? 0 : parseInt(track.bResponse))),
                          _.isNull(track.cResponse) ? 0 : parseInt(track.cResponse))) || '';
                      }
                      // Here you can assign the track data to the corresponding cell in your table
                      // For example, you might want to create a mapping of teamMemberId + day + subHeader to the track data
                    }
                    // else {
                    //   row[`${day}_${sub}`] = '';
                    //   console.log(`No match for teamMemberId: ${keyIds}, Day: ${day}, SubHeader: ${sub}. Track Day: ${trackDay}, Track SubHeader: ${trackSubHeader}`);
                    // }
                  });
                });
              });
            } else {
              // If no tracks found for this team member, initialize all cells to empty
              this.days.forEach(day => {
                this.subHeaders.forEach(sub => {


                  row[`${day}_${sub}`] = '';
                });
              });

              console.log('this.columns', this.columns);
            }
            this.rows.push(row);



          });


        });
    } catch (error) {

    }

  }
}
