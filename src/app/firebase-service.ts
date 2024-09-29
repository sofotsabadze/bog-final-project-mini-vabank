import { Injectable } from '@angular/core';
import {Database, ref, push, get} from '@angular/fire/database';  // Use the modular API

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db: Database) {}

    addClient(formData: any): void {
        const clientsRef = ref(this.db, 'clients');
        push(clientsRef, formData);
    }

    async fetchClients(): Promise<any> {
        const clientsRef = ref(this.db, 'clients');
        return get(clientsRef).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return null;
            }
        }).catch((error) => {
            console.error("Error fetching data:", error);
            throw error;
        });
    }
}