import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts = [
    { firstName: 'Peter', lastName: 'Poetry', phone: '123456789' },
    { firstName: 'Mary', lastName: 'Poetry', phone: '987654321' }
  ];
  searchTerm = '';
  selectedContact: { firstName: string; lastName: string; phone: string } | null = null;
  isEditing = false;

  // New contact model and state to control form visibility
  newContact = { firstName: '', lastName: '', phone: '' };
  showAddContactForm = false;

  // Filter contacts based on the search term
  filteredContacts() {
    return this.contacts.filter(contact =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // View selected contact details
  viewContact(contact: { firstName: string; lastName: string; phone: string }) {
    this.selectedContact = contact;
    this.isEditing = false; // Reset editing state
  }

  // Edit existing contact
  editContact(contact: { firstName: string; lastName: string; phone: string }) {
    this.newContact = { ...contact }; // Clone the contact for editing
    this.isEditing = true; // Set editing state to true
    this.showAddContactForm = true; // Show form for editing
    this.selectedContact = contact; // Set selected contact
  }

  // Delete a contact
  deleteContact(contact: { firstName: string; lastName: string; phone: string }) {
    this.contacts = this.contacts.filter(c => c !== contact);
    if (this.selectedContact === contact) {
      this.selectedContact = null; // Clear selection if deleted
    }
  }

  // Save a new or edited contact
  saveContact() {
    if (this.isEditing) {
      // Update the existing contact
      const index = this.contacts.findIndex(c => c.phone === this.selectedContact?.phone);
      if (index !== -1) {
        this.contacts[index] = { ...this.newContact }; // Update contact
      }
    } else {
      // Add new contact
      if (this.newContact.firstName && this.newContact.lastName && this.newContact.phone) {
        this.contacts.push({ ...this.newContact }); // Add new contact to the list
      }
    }
    this.newContact = { firstName: '', lastName: '', phone: '' }; // Reset form
    this.isEditing = false; // Exit editing mode
    this.showAddContactForm = false; // Hide form after saving
    this.selectedContact = null; // Clear selection
  }

  // Show the add contact form
  showAddForm() {
    this.showAddContactForm = true;
    this.isEditing = false; // Reset editing state
    this.newContact = { firstName: '', lastName: '', phone: '' }; // Reset form
  }
}
