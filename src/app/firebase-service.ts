import {Injectable} from '@angular/core';
import {Database, ref, push, get, child, set, remove, runTransaction} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db: Database) {
    }

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

    async deleteAccount(clientId: string, accountId: string): Promise<void> {
        try {
            console.log('Deleting account with ID: ', accountId);
            const accountRef = ref(this.db, `clients/${clientId}/accounts/${accountId}`);
            await remove(accountRef);
            console.log(`Account with ID ${accountId} has been deleted.`);
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    }

    async fetchAllAccountsExcept(excludeClientId: string): Promise<any[]> {
        try {
            const clients = await this.fetchClients();
            if (!clients || clients.length === 0) {
                console.log("No clients available.");
                return [];
            }

            const allAccounts = [];

            for (const client of clients) {
                if (client.clientId === excludeClientId) {
                    console.log(`Excluding accounts for clientId: ${excludeClientId}`);
                    continue;
                }

                const accounts = await this.fetchAccountsByClientId(client.clientId);
                if (accounts) {
                    const accountsWithClientId = accounts.map((account: any) => ({
                        clientId: client.clientId,
                        ...account
                    }));
                    allAccounts.push(...accountsWithClientId);
                }
            }

            console.log('Fetched all accounts excluding specific client:', allAccounts);
            return allAccounts;
        } catch (error) {
            console.error("Error fetching all accounts for all clients:", error);
            throw error;
        }
    }

    async transferFunds(senderAccount: any, receiverAccount: any, amount: number): Promise<void> {
        try {
            console.log('account ids:');
            console.log(senderAccount);
            console.log(receiverAccount);

            const senderRef = ref(this.db, `clients/${senderAccount.clientId}/accounts/${senderAccount.accountId}`);
            const receiverRef = ref(this.db, `clients/${receiverAccount.clientId}/accounts/${receiverAccount.accountId}`);

            await runTransaction(senderRef, (sender) => {
                if (sender) {
                    if (sender.amount < amount) {
                        throw new Error('Insufficient balance in sender account');
                    }
                    sender.amount -= amount;
                }
                return sender;
            });

            await runTransaction(receiverRef, (receiver) => {
                if (receiver) {
                    receiver.amount += amount;
                }
                return receiver;
            });

            console.log('Transfer successful:', {
                senderAccountId: senderAccount.accountId,
                receiverAccountId: receiverAccount.accountId,
                amount
            });

        } catch (error) {
            console.error('Error during fund transfer:', error);
            throw error;
        }
    }

    async getClientIdByAccountId(accountId: string): Promise<string | null> {
        try {
            const clientsRef = ref(this.db, 'clients');
            const snapshot = await get(clientsRef);

            if (snapshot.exists()) {
                const clientsData = snapshot.val();

                for (const clientId in clientsData) {
                    if (clientsData.hasOwnProperty(clientId)) {
                        const accounts = clientsData[clientId].accounts;

                        if (accounts && accounts.hasOwnProperty(accountId)) {
                            console.log(`Account ${accountId} belongs to clientId: ${clientId}`);
                            return clientId;
                        }
                    }
                }

                console.log(`No client found with accountId: ${accountId}`);
                return null;
            } else {
                console.log("No clients available in the database");
                return null;
            }
        } catch (error) {
            console.error("Error fetching clientId by accountId:", error);
            throw error;
        }
    }
}