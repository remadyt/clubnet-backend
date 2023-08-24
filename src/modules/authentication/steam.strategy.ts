import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-steam';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      returnURL: `${process.env.AUTH_FUNCTION_DOMAIN}/auth/steam/return`,
      realm: process.env.AUTH_FUNCTION_DOMAIN,
      apiKey: process.env.STEAM_API_KEY,
      state: true,
      passReqToCallback: true,
    });
  }

  async validate(
    req,
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
