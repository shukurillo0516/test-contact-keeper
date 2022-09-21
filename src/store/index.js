import { createStore } from "vuex";
import { compareObjects, updateStorage } from "../service/helper.js";

import dummyData from "../data/dummyData.json";

const store = createStore({
  state() {
    return {
      contacts: [],
    };
  },
  mutations: {
    loadContacts(state) {
      if (localStorage.getItem("contacts")) {
        state.contacts = JSON.parse(localStorage.getItem("contacts"));
      } else {
        localStorage.setItem("contacts", JSON.stringify(dummyData));
        state.contacts = dummyData;
      }
    },
    addContact(state, payload) {
      state.contacts.push(payload);
      updateStorage(state.contacts);
    },
    deleteContacts(state, selectedItems) {
      state.contacts = state.contacts.filter(
        (item) => selectedItems.indexOf(item.id) < 0
      );
      updateStorage(state.contacts);
    },
    updateContact(state, payload) {
      let { id, val } = payload;
      let contactArr = state.contacts.filter((item) => item.id == id);
      contactArr[0] = val;
      updateStorage(state.contacts);
    },
    filterContacts(state, payload) {
      let { field, val } = payload;
      state.contacts = state.contacts.filter((item) =>
        item[field].toLowerCase().includes(val.toLowerCase())
      );
    },
    filterContactsByColumn(state, payload) {
      let { field, asc } = payload;
      state.contacts.sort((item1, item2) => {
        return compareObjects(item1, item2, field, asc);
      });
    },
  },
});

export default store;
