import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Contact } from '../entitys/contact';

class ContactController {

  static all = async (req: Request, res: Response) => {

    const contactRepository = getRepository(Contact);

    const contacts = await contactRepository.find();

    res.send(contacts);

  }

}

export default ContactController;
