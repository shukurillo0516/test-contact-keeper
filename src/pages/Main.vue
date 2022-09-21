<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import myButton from "../components/Button.vue";
import AddContactPopup from "../components/AddContactPopup.vue";
import myTable from "../components/Table.vue";
import radioButton from "../components/Radio.vue";

let store = useStore();

let popupTrigger = ref(false);
function togglePopup() {
  popupTrigger.value = !popupTrigger.value;
}

let changeContactId = ref("");
function updateContact(id) {
  changeContactId.value = id;
  togglePopup();
}

let filterQuery = ref("");
let filterField = ref("fullName");

watch(filterQuery, (newQuery, prevQuery) => {
  if (newQuery) {
    let payload = { field: filterField.value, val: newQuery };
    store.commit("filterContacts", payload);
  } else {
    store.commit("loadContacts");
  }
});
</script>
<template>
  <div class="w-full">
    <myButton @click.native="(changeContactId = ''), togglePopup()"
      >добавить контакт</myButton
    >
    <AddContactPopup
      v-if="popupTrigger"
      :TogglePopup="togglePopup"
      :changeContactId="changeContactId"
    />

    <div class="w-3/4 mx-auto text-center">
      <p class="text-3xl mb-3">Выберите поле для фильтра</p>
      <div class="flex">
        <radioButton
          @change.native="filterField = 'fullName'"
          :checked="true"
          class="w-1/4 mr-3"
          :label="'ФИО'"
        />
        <radioButton
          @change.native="filterField = 'phoneNumber'"
          class="w-1/4 mr-3"
          :label="'Номер телефона'"
        />
        <radioButton
          @change.native="filterField = 'email'"
          class="w-1/4 mr-3"
          :label="'Email адрес'"
        />
        <radioButton
          @change.native="filterField = 'tag'"
          class="w-1/4"
          :label="'Тег'"
        />
      </div>
      <div class="flex justify-center mt-4">
        <div class="w-full mr-2">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="введите для фильтрации"
            v-model="filterQuery"
          />
        </div>
        <myButton @click.native="filterQuery = ''">очистить</myButton>
      </div>
    </div>

    <myTable class="mt-3" @update-contact="(id) => updateContact(id)" />
  </div>
</template>
