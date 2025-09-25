import { Router } from 'express';
import {
  listContacts,
  getContact,
  createContactCtrl,
  patchContactCtrl,
  removeContactCtrl,
} from '../controllers/contacts.js';

import { isValidID } from '../middlewares/isValidID.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema, updateContactSchema } from '../validation/contact.js';

export const contactsRouter = Router();

contactsRouter.get('/', listContacts);

contactsRouter.get('/:contactId', isValidID, getContact);

contactsRouter.post('/', validateBody(contactSchema), createContactCtrl);

contactsRouter.patch(
  '/:contactId',
  isValidID,
  validateBody(updateContactSchema),
  patchContactCtrl,
);

contactsRouter.delete('/:contactId', isValidID, removeContactCtrl);
