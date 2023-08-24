import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

@Injectable()
export class AuthService {
  constructor(@Inject('FIREBASE') private firebase: admin.app.App) {}

  async getUserBySteamId(steamId: string): Promise<DocumentData> {
    try {
      const db = this.firebase.firestore();
      const userDoc = db
        .collection('users')
        .where('steamId', '==', steamId)
        .get();

      const docSnap = (await userDoc).docs;

      if (!docSnap[0]) {
        return;
      }

      return docSnap[0].data();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('User not found');
      } else {
        throw error; // Rethrow if it's another error
      }
    }
  }

  async updateSteamData(steamData: any) {
    const steamId = steamData.steamID.match(/\d+$/)[0];
    const db = this.firebase.firestore();
    const userDoc = db.collection('steamData').doc(steamId);

    await userDoc.set({ ...steamData, steamID: steamId });
  }

  async createCustomTokenById(uid: string) {
    return this.firebase.auth().createCustomToken(uid);
  }
}
