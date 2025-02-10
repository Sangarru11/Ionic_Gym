import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(Auth);

  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      user.email,
      user.password
    );
  }
}
