import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Database, ref, set} from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    constructor(private auth: Auth, private database: Database, private router: Router) {}

    async signIn(username: string, password: string) {
        const email = username + '@gmail.com';
        const result = await signInWithEmailAndPassword(this.auth, email, password);
        const token = await result.user.getIdToken();
        localStorage.setItem('authToken', token);
        console.log('User signed in:', result);
    }

    async signUp(username: string, password: string, name: string) {
        console.log('User signup:', username, password);
        const email = username + '@gmail.com';
        console.log('User email:', email);
        const result = await createUserWithEmailAndPassword(this.auth, email, password);
        console.log('User registered:', result);

        const userRef = ref(this.database, `users/${result.user.uid}`);
        await set(userRef, {
            username: username,
            name: email,
            uid: result.user.uid
        });

    }

    async signOut() {
        try {
            await signOut(this.auth);
            console.log('User signed out');
            localStorage.removeItem('authToken');
            this.router.navigate(['/auth']);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }
}
