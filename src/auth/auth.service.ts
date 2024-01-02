import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma.service'
import { SignInDto } from './dto/sign-in.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private prisma: PrismaService) {}

  async signIn(data: SignInDto) {
    const user = await this.prisma.admin.findUnique({
      where: {
        username: data.username
      }
    })

    if (!user) {
      throw new UnauthorizedException('The login or password is incorrect.');
    }

    const isSamePassword = await bcrypt.compare(data.password, user.password)

    if (!isSamePassword) {
      throw new UnauthorizedException('The login or password is incorrect.');
    }

    const payload = { id: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15d'
      })
    }
  }
}
