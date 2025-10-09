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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

export const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', listContacts);
contactsRouter.get('/:contactId', isValidID, getContact);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactSchema),
  createContactCtrl,
);

contactsRouter.patch(
  '/:contactId',
  isValidID,
  upload.single('photo'),
  validateBody(updateContactSchema),
  patchContactCtrl,
);

contactsRouter.delete('/:contactId', isValidID, removeContactCtrl);
