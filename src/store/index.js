import { createStore } from "vuex";
import {
  compareObjects,
  updateStorage,
  loadStorageContacts,
} from "../service/helper.js";

import dummyData from "../data/dummyData.json";

const store = createStore({
  state() {
    return {
      contacts: [],
    };
  },

  mutations: {
    loadContacts(state) {
      // This function checks if contact instance exists in store
      // if it does it returns their values
      // else it loads dummy data to localStorage and returns it
      if (localStorage.getItem("contacts")) {
        state.contacts = JSON.parse(localStorage.getItem("contacts"));
      } else {
        localStorage.setItem("contacts", JSON.stringify(dummyData));
        state.contacts = dummyData;
      }
    },
    addContact(state, payload) {
      // This function takes contact instanse and adds to storage and vuex
      state.contacts.push(payload);
      let data = loadStorageContacts();
      data.push(payload);
      updateStorage(data);
    },
    deleteContacts(state, selectedItems) {
      // This function can delete one or several contacts at once
      // It deletes contacts from local storage and vuex state (to work in filtered state)
      state.contacts = state.contacts.filter(
        (item) => selectedItems.indexOf(item.id) < 0
      );
      let storageFilteredContacts = loadStorageContacts().filter(
        (item) => selectedItems.indexOf(item.id) < 0
      );
      updateStorage(storageFilteredContacts);
    },
    updateContact(state, payload) {
      // This function takes id of a contact
      // and updates its values by given values in payload
      let { id, val } = payload;
      let contactArr = state.contacts.filter((item) => item.id == id);
      contactArr[0] = val;

      let data = loadStorageContacts();
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data[i] = val;
        }
      }

      updateStorage(data);
    },
    filterContacts(state, payload) {
      // This function filters contacts by their field name
      // (field name can be "name", "email", etc)
      let { field, val, grow } = payload;
      if (!grow) {
        state.contacts = loadStorageContacts();
      }
      state.contacts = state.contacts.filter((item) =>
        item[field].toLowerCase().includes(val.toLowerCase())
      );
    },
    filterContactsByColumn(state, payload) {
      // This function filters contacts by table column name
      // either by ascending or descending order
      let { field, asc } = payload;
      state.contacts.sort((item1, item2) => {
        return compareObjects(item1, item2, field, asc);
      });
    },
  },
});

export default store;
