import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserAuth } from "./entities/user-auth.entity";
import { RefreshToken } from "./entities/refresh-token.entity";
import * as crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepo: Repository<UserAuth>,
    @InjectRepository(RefreshToken)
    private readonly refreshRepo: Repository<RefreshToken>,
  ) {}

  async register(email: string, password: string) {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) {
      throw new UnauthorizedException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = this.userRepo.create({ email, passwordHash });
    await this.userRepo.save(user);

    return this.issueTokens(user.id);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueTokens(user.id);
  }

  async refresh(refreshToken: string) {
    const tokenHash = this.hashToken(refreshToken);
    const stored = await this.refreshRepo.findOne({ where: { tokenHash } });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    // Rotate: revoke old token
    stored.revokedAt = new Date();
    await this.refreshRepo.save(stored);

    return this.issueTokens(stored.userId);
  }

  private async issueTokens(userId: string) {
    const accessToken = jwt.sign({ sub: userId }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_TTL,
    });

    const rawRefreshToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = this.hashToken(rawRefreshToken);

    const refreshToken = this.refreshRepo.create({
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
    });
    await this.refreshRepo.save(refreshToken);

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      userId,
    };
  }

  private hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
}
