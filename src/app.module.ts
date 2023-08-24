import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAdminModule } from './modules/firebaseAdmin/firebase-admin.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from 'src/modules/authentication/auth.module';

@Module({
  imports: [FirebaseAdminModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
