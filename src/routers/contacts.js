import { Router } from 'express';
import {
  listContacts,
  getContact,
  createContactCtrl,
  patchContactCtrl,
  removeContactCtrl,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(listContacts));
contactsRouter.get('/:contactId', ctrlWrapper(getContact));
contactsRouter.post('/', ctrlWrapper(createContactCtrl));
contactsRouter.patch('/:contactId', ctrlWrapper(patchContactCtrl));
contactsRouter.delete('/:contactId', ctrlWrapper(removeContactCtrl));
