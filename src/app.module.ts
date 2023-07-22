import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminModule } from './modules/firebaseAdmin/firebase-admin.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [FirebaseAdminModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
