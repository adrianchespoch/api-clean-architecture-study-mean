import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    rol: {
      type: String,
      maxlength: 30,
      required: true,
      enum: ['client', 'admin', 'instructor'],
    },
    name: { type: String, maxlength: 250, required: true },
    surname: { type: String, maxlength: 250, required: true },
    email: { type: String, maxlength: 250, required: true, unique: true },
    password: { type: String, maxlength: 250, required: true },
    avatar: { type: String, maxlength: 250, required: false },
    state: { type: Boolean, default: true }, //1 ES ACTIVO 2 ES INACTIVO
    phone: { type: String, maxlength: 30, required: false },
    birthday: { type: String, maxlength: 30, required: false },
    profession: { type: String, maxlength: 250, required: false },
    description: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('User', UserSchema);
