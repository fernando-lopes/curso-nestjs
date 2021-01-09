import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  document: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  pets: [
    {
      name: {
        type: String,
        trim: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'none'],
      },
      kind: {
        type: String,
        trim: true,
      },
      brand: {
        type: String,
        trim: true,
      },
    },
  ],
  billingAddress: {
    zipCode: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    complement: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  shippingAddress: {
    zipCode: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    complement: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
