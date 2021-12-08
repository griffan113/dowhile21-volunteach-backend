import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { ITokenPayload } from '@modules/users/types/ITokenPayload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export default class JwtStrategyProvider extends PassportStrategy(
  Strategy,
  'jwt'
) {
  constructor(
    @Inject('UserRepository')
    private userRepository: IUserRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  // Write user object inside session
  public async validate({ sub }: ITokenPayload) {
    const user = await this.userRepository.findById(sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    delete user.password;

    return user;
  }
}
