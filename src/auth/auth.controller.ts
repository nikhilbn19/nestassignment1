import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signup } from './signup';
import { Login } from './login';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth') // Grouping under "Auth" in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User Signup' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        mobileNo: { type: 'string' }
      },
      required: ['username', 'email', 'password', 'mobileNo'],
    },
  })
  @Post('signup')
  signup(@Body() signup: Signup) {
    return this.authService.signup(signup);
  }

  @ApiOperation({ summary: 'User Login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        usernameOrEmail: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['usernameOrEmail', 'password'],
    },
  })
  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }
}
