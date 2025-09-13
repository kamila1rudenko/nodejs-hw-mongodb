import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    isFavourite: { type: Boolean, default: false }, // по ТЗ с 'u'
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'contacts',
  },
);

export const Contact = model('Contact', contactSchema);
