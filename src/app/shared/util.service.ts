import { Injectable } from '@angular/core';
import * as _ from 'lodash';
// import * as  moment from 'moment/moment';
import { CommonHttpService } from './common-http.service';
import { AppConstant } from '../app.constant'; import {
    Firestore,
    collection,
    collectionData,
    addDoc,
    query,
    where,
} from '@angular/fire/firestore';
import { map, mergeMap, of } from 'rxjs';
@Injectable()
export class UtilService {
    // public shiftMasterMins
    constructor(
        private httpService: CommonHttpService,
        private firestore: Firestore,
    ) { }

    public async login(data: any): Promise<any> {
        return this.httpService
            .globalPostService(
                AppConstant.API_ENDPOINT + AppConstant.API_URL.LOGIN,
                data,
            )
            .then((res1) => {
                return res1;
            });
    }

    public async GetUnit(data: any): Promise<any> {
        return this.httpService
            .globalGetService(
                AppConstant.API_ENDPOINT + AppConstant.API_URL.UNIT,
                data,
            )
            .then((res1) => {
                return res1;
            });
    }

    public async GetShape(data: any): Promise<any> {
        return this.httpService
            .globalGetService(
                AppConstant.API_ENDPOINT + AppConstant.API_URL.SHAPE,
                data,
            )
            .then((res1) => {
                return res1;
            });
    }
    public async GetCustomer(data: any): Promise<any> {
        return this.httpService
            .globalGetService(
                AppConstant.API_ENDPOINT + AppConstant.API_URL.CUSTOMER,
                data,
            )
            .then((res1) => {
                return res1;
            });
    }

    public async GetProductCategory(data: any): Promise<any> {
        return this.httpService
            .globalGetService(
                AppConstant.API_ENDPOINT + AppConstant.API_URL.CATEGORY,
                data,
            )
            .then((res1) => {
                return res1;
            });
    }

    public getCurrentWeekDetails(date: Date = new Date()) {

  const current = new Date(date);

  // Sunday=0 ... Saturday=6
  const day = current.getDay();

  // Find Saturday
  const diffToSaturday = (day + 1) % 7;

  // Week Start (Saturday)
  const weekStart = new Date(current);
  weekStart.setDate(current.getDate() - diffToSaturday);
  weekStart.setHours(0, 0, 0, 0);

  // Week End (Friday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);

  // Week Number
  const yearStart = new Date(weekStart.getFullYear(), 0, 1);

  const diffTime =
    weekStart.getTime() - yearStart.getTime();

  const diffDays = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  const weekNumber = Math.floor(diffDays / 7) + 1;

  return {
    weekNumber,
    weekStart,
    weekEnd
  };
}

    /**
     * GetTeamAndMemberLists
     */
    public async GetTeamAndMemberLists() {
        let TeamlLists: any[] = [];
        let teamMembersList: any[] = [];
        var user: any = localStorage.getItem('User');
        user = JSON.parse(user);
        const teamCollection = collection(this.firestore, 'teams');
        const q = query(
            teamCollection,
            where('accessUsers', 'array-contains', user.email),
        );

        return await collectionData(q, { idField: 'id' }).pipe(
            mergeMap(async (data: any[]) => {
                TeamlLists = data;
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
                    return await collectionData(q2, { idField: 'id' }).pipe(
                        map((data) => {
                            teamMembersList = data.map((x: any) => {
                                let find = TeamlLists.find((v) => {
                                    return x.teamId == v.id;
                                });
                                x.teamName = find.name;
                                return x;
                            });
                            return {
                                TeamlLists,
                                teamMembersList,
                            };
                        }),
                    );
                } else {
                    return of({
                        TeamlLists,
                        teamMembersList,
                    });
                }
            }),
        );
    }
}
