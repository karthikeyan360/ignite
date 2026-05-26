import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppConstant } from '../app.constant';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { tap, map, isEmpty, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JWTTokenInterceptorService {

    constructor(
        private route: Router,private messageService:MessageService,
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var authToken: any =localStorage.getItem("Access-Token");
     
        let PageId: number = 0;
        var _this = this;

        //console.log("GetPages", GetPages);


        if (authToken != undefined && authToken != "") {
            req = req.clone({
                setHeaders: {
                    'Authorization': "Bearer" + " " + authToken,
                    //'user-data': [user.id],
                    // 'user-id':user.UserId,
                    // 'IpAddress': user.UserIpAddress,
                }
            });
        }
        else {
            console.error('Token Empty');
        }
      
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
               }
            }),
            catchError((err: any) => {

              
                if (err instanceof HttpErrorResponse) {
                    try {
                        const TokenExpired: any = err.headers.get('Token-Expired');
               
                        // this.toasterService.error(err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
                        if (err.error.Message) {
                         
                            this.messageService.add({ severity: 'error', summary: 'Error', detail:  err.error.Message });
                        } else    this.messageService.add({ severity: 'error', summary: 'Error', detail: "Intenal Serve Error" });

                        if (TokenExpired) {
                            this.route.navigate(['login']);
                            // this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                        }
                    } catch (e) {
                        // this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
                        this.messageService.add({ severity: 'error', summary: 'Error', detail:  'An error occurred' });
                       
                    }
                    //log error 
                }
                return of(err);
            }));

    }
}
