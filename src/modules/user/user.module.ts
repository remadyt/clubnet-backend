import { UserService } from './user.service';
import { FirebaseAdminModule } from '../firebaseAdmin/firebase-admin.module';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [FirebaseAdminModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
