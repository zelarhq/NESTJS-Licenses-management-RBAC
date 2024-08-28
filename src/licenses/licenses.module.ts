// src/licenses/licenses.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './licenses.entity';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([License]),
    UsersModule, // Import UsersModule
    JwtModule.register({
      secret: 'euiokjuippsksjdhubnxmkajshdyuiw234', // Replace with your actual secret key
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [LicensesController],
  providers: [LicensesService],
})
export class LicensesModule {}
