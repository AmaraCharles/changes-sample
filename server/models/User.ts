import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;

  username?: string;
  fullName?: string;
  bio?: string;

  following: Types.ObjectId[];
  followers: Types.ObjectId[];

  website?: string;
  twitter?: string;
  instagram?: string;
 level?: string;
  profileImage?: string | null;

  notifications: {
    email: boolean;
    sales: boolean;
    bids: boolean;
    exhibitions: boolean;
  };

  verified: boolean;
  verificationCode?: string;
  verificationExpiry?: Date;

  walletAddress?: string;
  walletBalance: number;
  wethBalance: number;

  resetPasswordCode?: string;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    // ✅ Added followers & following
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    website: {
      type: String,
      trim: true,
    },

    twitter: {
      type: String,
      trim: true,
    },

    instagram: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    notifications: {
      email: { type: Boolean, default: true },
      sales: { type: Boolean, default: true },
      bids: { type: Boolean, default: true },
      exhibitions: { type: Boolean, default: true },
    },

    verified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
    },

      level: {
      type: String,
    },

    verificationExpiry: {
      type: Date,
    },

    walletAddress: {
      type: String,
    },

    walletBalance: {
      type: Number,
      default: 0,
    },

    wethBalance: {
      type: Number,
      default: 0,
    },

    resetPasswordCode: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
