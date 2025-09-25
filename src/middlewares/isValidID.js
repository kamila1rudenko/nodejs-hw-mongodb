import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidID(req, res, next) {
  const { contactId } = req.params;
  if (isValidObjectId(contactId) !== true) {
    throw new createHttpError.BadRequest('ID is not valid');
  }
  next();
}
