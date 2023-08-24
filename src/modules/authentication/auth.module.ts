import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { SteamStrategy } from 'src/modules/authentication/steam.strategy';
import { FirebaseAdminModule } from 'src/modules/firebaseAdmin/firebase-admin.module';
import { AuthService } from 'src/modules/authentication/auth.service';

@Module({
  imports: [PassportModule.register({ session: true }), FirebaseAdminModule],
  controllers: [AuthController],
  providers: [SteamStrategy, SessionSerializer, AuthService],
})
export class AuthModule {}
