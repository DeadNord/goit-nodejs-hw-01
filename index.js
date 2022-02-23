const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
} = require("./models/contacts/index");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case "getById":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Product with id=${id} nor found`);
      }
      console.log(contact);
      break;

    case "addContact":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "removeContact":
      const removeContact = await removeContactById(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async () => {
  await invokeAction(argv);
})();
