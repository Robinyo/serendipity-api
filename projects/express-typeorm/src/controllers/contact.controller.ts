import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Contact } from '../entitys/contact';

import { logger } from '../utils/logger/logger';

class ContactController {

  static all = async (req: Request, res: Response) => {

    const contactRepository = getRepository(Contact);

    const contacts = await contactRepository.find();

    logger.info('contacts: ' + JSON.stringify(contacts));

    res.send(contacts);

  }

}

export default ContactController;
