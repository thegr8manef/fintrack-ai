/**
 * User Service — Controller
 *
 * REST endpoints for user profile and preferences management:
 *   GET  /users/:id              — Returns full user profile
 *   PUT  /users/:id              — Partial update of profile fields
 *   GET  /users/:id/preferences  — Returns user notification/insight preferences
 *   PUT  /users/:id/preferences  — Upsert preferences (creates if missing)
 */
import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  getProfile(@Param("id") id: string) {
    return this.userService.getProfile(id);
  }

  @Put(":id")
  updateProfile(@Param("id") id: string, @Body() body: any) {
    return this.userService.updateProfile(id, body);
  }

  @Get(":id/preferences")
  getPreferences(@Param("id") id: string) {
    return this.userService.getPreferences(id);
  }

  @Put(":id/preferences")
  updatePreferences(@Param("id") id: string, @Body() body: any) {
    return this.userService.updatePreferences(id, body);
  }
}
