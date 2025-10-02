import { Contact } from '../models/contacts.js';

export async function getContactById(userId, contactId) {
  return Contact.findOne({ _id: contactId, userId }).lean();
}

export async function createContact(userId, payload) {
  const doc = await Contact.create({ ...payload, userId });
  return doc.toObject();
}

export async function updateContactById(userId, id, patch) {
  return Contact.findOneAndUpdate({ _id: id, userId }, patch, {
    new: true,
    runValidators: true,
  }).lean();
}

export async function deleteContactById(userId, id) {
  return Contact.findOneAndDelete({ _id: id, userId }).lean();
}

export async function listContactsWithQuery(userId, params) {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = params;

  const filter = { userId };
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
