/**
 * Auth Service — Controller
 *
 * REST endpoints for authentication:
 *   POST /auth/register  — Creates a new user account in the database
 *   POST /auth/login     — Validates email/password, returns JWT + refresh token
 *   POST /auth/refresh   — Accepts a refresh token, rotates it, issues new JWT
 *
 * All endpoints return: { accessToken, refreshToken, userId }
 */
import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";

class LoginDto {
  email!: string;
  password!: string;
}

class RegisterDto {
  email!: string;
  password!: string;
}

class RefreshDto {
  refreshToken!: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }
}
