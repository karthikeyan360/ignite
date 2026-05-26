import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';

import { CommonHttpService } from './shared/common-http.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';

import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { UtilService } from './shared/util.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTTokenInterceptorService } from './shared/jwttoken-interceptor.service';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppConstant } from './app.constant';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ToastModule,
        KeyFilterModule,
        FormsModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,

        provideFirebaseApp(() => initializeApp(AppConstant.firebaseConfig)),

        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JWTTokenInterceptorService,
            multi: true,
        },

        CommonHttpService,
        MessageService,
        UtilService,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
