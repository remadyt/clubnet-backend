import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

// TODO: add error handling, need delete subcollections,

@Injectable()
export class UserService {
  constructor(@Inject('FIREBASE') private firebase: admin.app.App) {}

  async deleteUser(uid: string): Promise<void> {
    try {
      await this.firebase.auth().getUser(uid);
      await this.firebase.auth().deleteUser(uid);

      const db = this.firebase.firestore();
      const userDoc = db.collection('users').doc(`user-${uid}`);

      await userDoc.delete();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('User not found');
      } else {
        throw error; // Rethrow if it's another error
      }
    }
  }
}
