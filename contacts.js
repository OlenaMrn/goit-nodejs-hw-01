const fs = require("fs").promises;
const path = require("node:path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const { nanoid } = require("nanoid");


// TODO: задокументувати кожну функцію

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const result = JSON.parse(data);
  return result;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const data = await listContacts();
    const result = data.find((item) => item.id === contactId);
    return result ? result : null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    
    const data = await listContacts();
    const index = data.findIndex((item) => item.id === contactId);
    const removedContact = data[index];
    if (index !== -1) {
    data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  }
    return removedContact ? removedContact : null;
}
   
async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
    const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
    const data = await listContacts();
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};