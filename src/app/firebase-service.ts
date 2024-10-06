import { Injectable } from '@angular/core';
import {Database, ref, push, get, child, set} from '@angular/fire/database';

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
        try {
            const clientsRef = ref(this.db, 'clients');
            const snapshot = await get(clientsRef);

            if (snapshot.exists()) {
                const clientsData = snapshot.val();

                const clientsWithId = Object.keys(clientsData).map((key) => ({
                    clientId: key,
                    ...clientsData[key]
                }));

                return clientsWithId;
            } else {
                console.log("No data available");
                return null;
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
            throw error;
        }
    }

    async fetchClient(clientId: string) {
        try {
            const clientRef = ref(this.db);
            const snapshot = await get(child(clientRef, `clients/${clientId}`));

            if (snapshot.exists()) {
                console.log('Client data:', snapshot.val());
                return snapshot.val();
            } else {
                console.log("No data available for clientId:", clientId);
                return null;
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
            throw error;
        }
    }

    async addAccount(clientId: string, accountName: string, accountAmount: number): Promise<void> {
        try {
            const accountsRef = ref(this.db, `clients/${clientId}/accounts`);
            const newAccountRef = push(accountsRef);
            await set(newAccountRef, {
                clientId: clientId,
                accountName: accountName,
                accountAmount: accountAmount
            });
            console.log('Account added successfully!');
        } catch (error) {
            console.error('Error adding account:', error);
            throw error;
        }
    }

    async fetchAccountsByClientId(clientId: string): Promise<any> {
        try {
            console.log('Fetching account for clientId: ', clientId);
            const accountRef = ref(this.db);
            const snapshot = await get(child(accountRef, `clients/${clientId}/accounts`));

            if (snapshot.exists()) {
                const accountsData = snapshot.val();
                console.log('Fetched accounts for client:', accountsData);

                const accountsWithId = Object.keys(accountsData).map(key => ({
                    accountId: key,
                    ...accountsData[key]
                }));

                return accountsWithId;
            } else {
                console.log("No accounts available for clientId:", clientId);
                return null;
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
            throw error;
        }
    }
}