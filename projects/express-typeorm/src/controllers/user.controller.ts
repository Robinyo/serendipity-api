import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

export class UserController {

  private userRepository = getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {

    // return this.userRepository.find();

    console.log('all');

    const users = await this.userRepository.find();

    // return loaded posts
    response.send(users);
  }

  async one(request: Request, response: Response, next: NextFunction) {

    // return this.userRepository.find(request.params.id);

    console.log('one');
    console.log('request.params.id: ' + request.params.id);

    const user = await this.userRepository.findOne(request.params.id);

    response.send(user);

  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const userToRemove = await this.userRepository.findOne(request.params.id);
    await this.userRepository.remove(userToRemove);
  }

}
