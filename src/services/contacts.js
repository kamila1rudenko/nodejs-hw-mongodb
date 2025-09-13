import { Contact } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  return Contact.find().lean();
};

export const getContactById = async (contactId) => {
  return Contact.findById(contactId).lean();
};
