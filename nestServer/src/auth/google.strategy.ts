import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
@Injectable()
class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      scope: ['profile', 'email'],
      callbackURL: '/auth/google/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const name = profile.displayName;
      const email = profile.emails ? profile.emails[0].value : null;
      const image = profile.photos ? profile.photos[0].value : null;
      if (!email || !name) return done(null, false);
      const existingUser = await this.userService.findByEmail(email);

      if (!existingUser) {
        const user = await this.userService.createUser({
          name,
          email,
          password: null,
          phoneNumber: '',
          image: image ? image : null,
        });
        return done(null, user);
      } else {
        await this.userService.updateUser(existingUser.id, {
          image: image ? image : null,
        });
        return done(null, existingUser);
      }
    } catch (err) {
      return done(err, false);
    }
  }
}
export default GoogleStrategy;
