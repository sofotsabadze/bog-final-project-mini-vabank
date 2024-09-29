import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {environment} from "./enviroment";
import {getAuth, provideAuth} from "@angular/fire/auth";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideDatabase(() => getDatabase()),
        provideAuth(() => getAuth()),
    ]
};
