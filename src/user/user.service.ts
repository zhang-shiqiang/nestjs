import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

	/**
	 * 查询所有用户
	 */
	findAll(): any {
    return {
			code: 200,
			data: this.userRepository.find(),
		};
  }

	/**
	 * 新增用户
	 * @param userData 
	 * @returns 
	 */
	createUser(userData: Partial<User>): Promise<User> {
		const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
	}


	updateUser(id: number, updateData: Partial<User>): Promise<UpdateResult> {
	
		return this.userRepository.update(id, updateData);
	}

}
