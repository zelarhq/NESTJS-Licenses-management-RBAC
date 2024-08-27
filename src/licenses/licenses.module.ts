import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './licenses.entity';
import { User } from '../users/user.entity'; // Import the User entity
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([License, User]), // Add User entity here
    UsersModule, // Import the UsersModule
  ],
  controllers: [LicensesController],
  providers: [LicensesService],
})
export class LicensesModule {}
