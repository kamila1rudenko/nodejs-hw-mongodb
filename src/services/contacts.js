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

export async function listContactsWithQuery(params) {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = params;

  const filter = {};
  if (type) filter.contactType = type;
  if (typeof isFavourite === 'boolean') filter.isFavourite = isFavourite;

  const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  const totalItems = await Contact.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const skip = (safePage - 1) * perPage;

  const data = await Contact.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(perPage)
    .lean();

  return {
    data,
    page: safePage,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: safePage > 1,
    hasNextPage: safePage < totalPages,
  };
}
