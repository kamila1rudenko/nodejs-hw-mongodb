import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => Contact.find().lean();

export const getContactById = async (contactId) =>
  Contact.findById(contactId).lean();

export const createContact = async (payload) => {
  const doc = await Contact.create(payload);
  return doc.toObject();
};

export const updateContactById = async (id, patch) =>
  Contact.findByIdAndUpdate(id, patch, {
    new: true,
    runValidators: true,
  }).lean();

export const deleteContactById = async (id) =>
  Contact.findByIdAndDelete(id).lean();
