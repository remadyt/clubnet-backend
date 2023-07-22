import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../serviceAccountKey.json';
import { ServiceAccount } from 'firebase-admin';

@Module({
  providers: [
    {
      provide: 'FIREBASE',
      useValue: admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
        databaseURL: 'https://auth-398b3-default-rtdb.firebaseio.com',
      }),
    },
  ],
  exports: ['FIREBASE'],
})
export class FirebaseAdminModule {}
