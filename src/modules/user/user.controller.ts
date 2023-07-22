import { Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete(':uid')
  async deleteUser(@Param('uid') uid: string): Promise<void> {
    await this.userService.deleteUser(uid);
  }
}
