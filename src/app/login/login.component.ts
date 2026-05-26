import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UtilService } from '../shared/util.service';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit, OnDestroy {
    public loading = false;

    password: string = '';
    userName: string = '';

    constructor(
        private route: Router,
        private messageService: MessageService,
        private UtilService: UtilService,
        private auth: Auth,
    ) {}

    ngOnInit(): void {
        localStorage.clear();
    }

    ngOnDestroy(): void {}
    /**
     * login
     */
    public login() {
        try {
            console.log(this.userName.trim(), this.password.trim());
            if (!this.userName || this.userName.trim() == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: ' Enter user name.',
                });
                return;
            }
            if (!this.password || this.password.trim() == '') {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: ' Enter Password',
                });
                return;
            }

            this.loading = true;
            // this.UtilService.login({
            //     username: this.userName.trim(),
            //     password: this.password.trim(),
            // }).then((response) => {
            //     this.loading = false;
            //     if (response) {
            //         localStorage.setItem('Access-Token', response.token);
            //         localStorage.setItem(
            //             'Refresh-Token',
            //             response.refreshToken,
            //         );

            //         this.messageService.add({
            //             severity: 'success',
            //             summary: 'Success',
            //             detail: 'Login Successfully.',
            //         });
            //         this.route.navigate(['production/list']);
            //     } else {
            //         this.messageService.add({
            //             severity: 'error',
            //             summary: 'Error',
            //             detail: 'login failded.',
            //         });
            //     }
            // });

            signInWithEmailAndPassword(
                this.auth,
                this.userName.trim(),
                this.password.trim(),
            )
                .then(async (userCredential) => {
                    this.loading = false;
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    const token = await userCredential.user.getIdToken();
                    localStorage.setItem('Access-Token', token);
                     localStorage.setItem('User', JSON.stringify(user));
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Login Successfully.',
                    });
                    this.route.navigate(['master/teamMembers']);
                })
                .catch((error) => {
                    this.loading = false;
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Login failed.',
                    });
                });
        } catch (error) {
            console.error(error);
            this.loading = false;
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Login failed.',
            });
        }
    }
}
