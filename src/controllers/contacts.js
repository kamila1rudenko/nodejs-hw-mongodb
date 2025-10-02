import createHttpError from 'http-errors';
import {
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
  listContactsWithQuery,
} from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const listContacts = async (req, res) => {
  const userId = req.user._id;
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { type, isFavourite } = parseFilterParams(req.query);

  const result = await listContactsWithQuery(userId, {
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: result,
  });
};

export const getContact = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const contact = await getContactById(userId, contactId);
  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactCtrl = async (req, res) => {
  const userId = req.user._id;
  const created = await createContact(userId, req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: created,
  });
};

export const patchContactCtrl = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const updated = await updateContactById(userId, contactId, req.body);
  if (!updated) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updated,
  });
};

export const removeContactCtrl = async (req, res) => {
  const userId = req.user._id;
  const { contactId } = req.params;
  const removed = await deleteContactById(userId, contactId);
  if (!removed) throw createHttpError(404, 'Contact not found');
  res.status(204).end();
};
