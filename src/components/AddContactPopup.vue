<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { onMounted } from "vue";
import Swal from "sweetalert2";
import myButton from "./Button.vue";
import redButton from "./RedButton.vue";

const props = defineProps(["TogglePopup", "changeContactId"]);

const store = useStore();
let contact = ref({
  fullName: "",
  phoneNumber: "",
  email: "",
  tag: "",
});

onMounted(() => {
  if (props.changeContactId) {
    contact.value = store.state.contacts.filter(
      (item) => item.id == props.changeContactId
    )[0];
  }
});

function clearForm() {
  contact.value = {
    id: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    tag: "",
  };
}

function setID() {
  contact.value.id = parseInt(Math.random() * 1_000_000);
}
function updateContact() {
  let payload = { id: props.changeContactId, val: contact.value };
  store.commit("updateContact", payload);
  Swal.fire("Успех!", "Контакт успешно сохранен", "success");
}

function saveUpdateContact() {
  if (props.changeContactId) {
    updateContact();
    return;
  }
  setID();
  store.commit("addContact", contact.value);
  clearForm();
  Swal.fire("Успех!", "Контакт успешно сохранен", "success");
}
</script>

<template>
  <div class="popup">
    <div class="popup-inner w-3/4">
      <form @submit.prevent @submit="saveUpdateContact()" class="mb-4">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          ФИО
        </label>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="введите ФИО"
          v-model="contact.fullName"
          required
        />
        <div class="lg:flex w-full mt-3">
          <div class="lg:w-1/2 mr-2">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Номер телефона (формат: xx-xxx-xxxx)
            </label>
            <input
              type="tel"
              pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="92-123-4567"
              v-model="contact.phoneNumber"
              required
            />
          </div>
          <div class="lg:w-1/2 lg:ml-2 lg:mt-0 mt-3">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Email адрес
            </label>
            <input
              type="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="введите email адрес"
              v-model="contact.email"
              required
            />
          </div>
        </div>
        <div class="mt-3">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Тег
          </label>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="введите тег"
            v-model="contact.tag"
            required
          />
        </div>
        <div class="mt-3">
          <redButton class="popup-close" @click.native="TogglePopup()"
            >Закрыть форму</redButton
          >
          <myButton v-if="!changeContactId" class="lg:ml-2" type="submit"
            >Добавить</myButton
          >
          <myButton v-else class="lg:ml-2" type="submit">Обновить</myButton>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: #fff;
  padding: 32px;
}
</style>
