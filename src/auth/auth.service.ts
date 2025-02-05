import { Injectable, BadRequestException } from '@nestjs/common';
import { Signup } from './signup';
import { Login } from './login';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly dbUrl = 'http://localhost:5000/users'; // JSON Server URL

  async signup(signup: Signup) {
    const { username, email, password, mobileNo } = signup;

    // Check if user exists
    const { data: users } = await axios.get(this.dbUrl);
    const userExists = users.find(user => user.email === email || user.username === username);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Create new user
    const newUser = { id: users.length + 1, username, email, password, mobileNo };
    await axios.post(this.dbUrl, newUser);

    return { message: 'User registered successfully', user: newUser };
  }

  async login(login: Login) {
    const { usernameOrEmail, password } = login;

    // Fetch users from JSON Server
    const { data: users } = await axios.get(this.dbUrl);
    const user = users.find(
      u => u.email === usernameOrEmail || u.username === usernameOrEmail,
    );

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    if (user.password !== password) {
      throw new BadRequestException('Incorrect password');
    }

    return { message: 'Login successful', user };
  }
}
