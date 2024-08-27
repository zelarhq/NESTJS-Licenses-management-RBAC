// //----working for users------
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { Role } from '../roles/role.entity';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     @InjectRepository(Role)
//     private rolesRepository: Repository<Role>,
//   ) {}

//   async createUser(
//     username: string,
//     password: string,
//     roleIds: number[],
//   ): Promise<User> {
//     // Create a new user
//     const user = new User();
//     user.username = username;
//     user.password = password;

//     if (roleIds && roleIds.length > 0) {
//       // Fetch roles from the database
//       user.roles = await this.rolesRepository.findByIds(roleIds);
//     }

//     return this.usersRepository.save(user);
//   }

//   findAll(): Promise<User[]> {
//     return this.usersRepository.find({ relations: ['roles', 'licenses'] });
//   }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOne({
//       where: { id },
//       relations: ['roles', 'licenses'],
//     });
//   }

//   async validateLicense(userId: number): Promise<boolean> {
//     const user = await this.findOne(userId);
//     const license = user.licenses.find(
//       (lic) => lic.isActive && lic.expiryDate > new Date(),
//     );
//     return !!license;
//   }
// }

// //----working for users------
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './user.entity';
// import { Role } from '../roles/role.entity';
// import { RolesService } from '../roles/roles.service';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private usersRepository: Repository<User>,
//     @InjectRepository(Role)
//     private rolesService: RolesService,
//   ) {}

//   //   async createUser(
//   //     username: string,
//   //     password: string,
//   //     roleIds: number[],
//   //   ): Promise<User> {
//   //     // Create a new user
//   //     const user = new User();
//   //     user.username = username;
//   //     user.password = password;

//   //     if (roleIds && roleIds.length > 0) {
//   //       // Fetch roles from the database
//   //       user.roles = await this.rolesRepository.findByIds(roleIds);
//   //     }

//   //     return this.usersRepository.save(user);
//   //   }

//   //   async createUser(
//   //     username: string,
//   //     password: string,
//   //     roleIds: number[],
//   //   ): Promise<User> {
//   //     const user = new User();
//   //     user.username = username;
//   //     user.password = password;

//   //     if (roleIds && roleIds.length > 0) {
//   //       user.roles = await this.rolesService.findRolesByIds(roleIds);
//   //     }

//   //     return this.usersRepository.save(user);
//   //   }

//   async createUser(
//     username: string,
//     password: string,
//     roleIds: number[],
//   ): Promise<User> {
//     const user = new User();
//     user.username = username;
//     user.password = password;

//     if (roleIds && roleIds.length > 0) {
//       // Correctly call the findRolesByIds method
//       user.roles = await this.rolesService.findRolesByIds(roleIds);
//     }

//     return this.usersRepository.save(user);
//   }
//   findAll(): Promise<User[]> {
//     return this.usersRepository.find({ relations: ['roles', 'licenses'] });
//   }

//   findOne(id: number): Promise<User> {
//     return this.usersRepository.findOne({
//       where: { id },
//       relations: ['roles', 'licenses'],
//     });
//   }

//   async validateLicense(userId: number): Promise<boolean> {
//     const user = await this.findOne(userId);
//     const license = user.licenses.find(
//       (lic) => lic.isActive && lic.expiryDate > new Date(),
//     );
//     return !!license;
//   }
// }

// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService, // Correct injection of RolesService
  ) {}

  async createUser(
    username: string,
    password: string,
    roleIds: number[],
  ): Promise<User> {
    const user = new User();
    user.username = username;
    user.password = password;

    if (roleIds && roleIds.length > 0) {
      user.roles = await this.rolesService.findRolesByIds(roleIds);
    }

    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles', 'licenses'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roles', 'licenses'],
    });
  }

  async validateLicense(userId: number): Promise<boolean> {
    const user = await this.findOne(userId);
    const license = user.licenses.find(
      (lic) => lic.isActive && lic.expiryDate > new Date(),
    );
    return !!license;
  }
}
