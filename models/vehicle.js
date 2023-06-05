import { Schema, model, models } from 'mongoose';

const VehicleSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: {
    type: String,
    required: [true, 'Type is required.'],
  },
  image: {
    type: String,
    required: [true, 'Image is required.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
  },
  make: {
    type: String,
    required: [true, 'Make is required.'],
  },
  model: {
    type: String,
    required: [true, 'Model is required.'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Purchase Date is required.'],
  },
  startingODO: {
    type: String,
    required: [true, 'Starting ODO is required.'],
  },
  notes: {
    type: String,
    required: [true, 'Notes ODO is required.'],
  },
});

const Vehicle = models.Vehicle || model('Vehicle', VehicleSchema);

export default Vehicle;
