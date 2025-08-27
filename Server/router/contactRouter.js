const express = require("express");
const route = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {
  AddContact,
  getAllContacts,
  editContact,
  deleteContact,
} = require("../controllers/contactController");

route.post("/addcontact", isLoggedIn, AddContact);
route.get("/getallcontacts", isLoggedIn, getAllContacts);
route.put("/editcontact/:contactId", isLoggedIn, editContact);
route.delete("/deletecontact/:contactId", isLoggedIn, deleteContact);

module.exports = route;
