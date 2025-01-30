
import mongoose from "mongoose";
import { type IUser } from "./user.dto";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const hashPassword = async (password: string) => {
        const hash = await bcrypt.hash(password, 12);
        return hash;
};

const UserSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        online: { type: Boolean, default: false },
      });

      UserSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
            return next();
        }
        this.password = await hashPassword(this.password);
        next();
    });

export default mongoose.model("user", UserSchema);










