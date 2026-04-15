/**
 * User Service — Business Logic
 *
 * Handles user profile CRUD and preference management:
 * - getProfile():        Find user by ID, throw 404 if missing
 * - updateProfile():     Partial update on user fields, return updated profile
 * - getPreferences():    Fetch preferences by userId
 * - updatePreferences(): Upsert — creates preferences if they don't exist,
 *                        updates if they do (idempotent operation)
 */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { UserPreference } from "./entities/user-preference.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserPreference)
    private readonly prefRepo: Repository<UserPreference>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async updateProfile(userId: string, data: Partial<User>) {
    await this.userRepo.update(userId, data);
    return this.getProfile(userId);
  }

  async getPreferences(userId: string) {
    return this.prefRepo.findOne({ where: { userId } });
  }

  async updatePreferences(userId: string, data: Partial<UserPreference>) {
    await this.prefRepo.upsert({ ...data, userId }, ["userId"]);
    return this.getPreferences(userId);
  }
}
