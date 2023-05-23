import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AdminSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },  
    password: { type: String, required: true },
})

const Admin = model("Admin", AdminSchema);
export default Admin;