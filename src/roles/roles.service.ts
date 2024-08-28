import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}
  async create(role: Role): Promise<Role> {
    return this.rolesRepository.save(role);
  }

  findRolesByIds(ids: number[]): Promise<Role[]> {
    return this.rolesRepository.findBy({
      id: In(ids),
    });
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.rolesRepository.findOne({ where: { id } });
  }
}
