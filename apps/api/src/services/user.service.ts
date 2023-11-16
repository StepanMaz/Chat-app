import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserData } from 'src/entities/user';
import { In, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users_repo: Repository<User>,
  ) {}

  async create(data: UserData) {
    return this.users_repo.create(data).save();
  }

  async delete(user_id: number) {
    await this.users_repo.delete(user_id);
  }

  get(id: number) {
    return this.users_repo.findOne({ where: { id } });
  }

  getFormArray(ids: number[]) {
    return this.users_repo.find({ where: { id: In(ids) } });
  }

  getAll() {
    return this.users_repo.find();
  }

  async update(id: number, data: Partial<UserData>) {
    await this.users_repo.update(id, data);
  }
}
