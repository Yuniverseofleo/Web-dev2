import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
    date_of_birth: { type: Date },
    address: { type: String },
    contact: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

// Middleware
// Hook
//user.save()
UserSchema.pre("save", async function () {
  // insert - allowed
  // update - hindi allowed
  // change password - allowed
  if (this.isModified("password")) {
    //this.password = clear text
    this.password = await bcrypt.hash(this.password, 10);
    //this.password = hashed password
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  // 1st param - clear text
  // 2nd param - hashed password from database
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", UserSchema);
