const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            contacts: [],
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ]
        },
        actions: {
            loadContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/JaimeGHE/contacts");
                    const data = await response.json();
                    setStore({ contacts: data.contacts });
                } catch (error) {
                    console.error("Error loading contacts", error);
                }
            },
            addContact: async (contact) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/JaimeGHE/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    const newContact = await response.json();
                    setStore({ contacts: [...getStore().contacts, newContact] });
                } catch (error) {
                    console.error("Error adding contact", error);
                }
            },
            updateContact: async (contact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JaimeGHE/contacts/${contact.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    const updatedContact = await response.json();
                    setStore({
                        contacts: getStore().contacts.map((c) => (c.id === updatedContact.id ? updatedContact : c))
                    });
                } catch (error) {
                    console.error("Error updating contact", error);
                }
            },
            deleteContact: async (id) => {
                try {
                    await fetch(`https://playground.4geeks.com/contact/agendas/JaimeGHE/contacts/${id}`, {
                        method: "DELETE"
                    });
                    setStore({
                        contacts: getStore().contacts.filter((c) => c.id !== id)
                    });
                } catch (error) {
                    console.error("Error deleting contact", error);
                }
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;