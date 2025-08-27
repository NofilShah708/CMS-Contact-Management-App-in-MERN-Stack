const express = require("express");
const contactModel = require("../models/contactModel.js");

const AddContact = async (req, res) => {
  const { name, email, phone, category, address } = req.body;
  try {
    const contact = await contactModel.create({
      name,
      email,
      phone,
      category,
      address,
      user: req.userId, // Assuming req.userId is set by authentication middleware
    });
    res.status(201).json({ message: "Contact added successfully", contact });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding contact", error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find({ user: req.userId }); // Assuming req.userId is set by authentication middleware
    res.status(200).json({ contacts });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching contacts", error: error.message });
  }
};

const editContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone, category, address } = req.body;
  try {
    const contact = await contactModel.findOneAndUpdate(
      { _id: contactId, user: req.userId }, // Ensure the contact belongs to the user
      { name, email, phone, category, address },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating contact", error: error.message });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await contactModel.findOneAndDelete({
      _id: contactId,
      user: req.userId, // Ensure the contact belongs to the user
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting contact", error: error.message });
  }
};

module.exports = { AddContact, getAllContacts, editContact, deleteContact };
