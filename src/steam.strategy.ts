import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/',
      apiKey: 'YOUR_STEAM_API_KEY',
    });
  }

  async validate(
    identifier: string,
    profile: any,
    done: (err?: any, user?: any) => void,
  ): Promise<any> {
    const { displayName, photos } = profile;

    const user = {
      displayName,
      steamID: identifier,
      photo: photos[2].value,
    };

    done(null, user);
  }
}
