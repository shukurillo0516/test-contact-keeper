<script setup>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import BaseButton from "../components/DefaultButton.vue";
import AddContactPopup from "../components/AddContactPopup.vue";
import TheTable from "../components/TheContactTable.vue";
import RadioButton from "../components/RadioButton.vue";

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
    let payload = {
      field: filterField.value,
      val: newQuery,
      grow: newQuery.length >= prevQuery.length,
    };
    store.commit("filterContacts", payload);
  } else {
    store.commit("loadContacts");
  }
});
</script>

<template>
  <div class="w-full">
    <BaseButton @click.native="(changeContactId = ''), togglePopup()"
      >добавить контакт</BaseButton
    >
    <AddContactPopup
      v-if="popupTrigger"
      :TogglePopup="togglePopup"
      :changeContactId="changeContactId"
    />

    <div name="filter" class="lg:w-3/4 mx-auto text-center">
      <p class="text-3xl mb-2">Выберите поле для фильтра</p>
      <div class="lg:flex w-full">
        <RadioButton
          @change.native="filterField = 'fullName'"
          :checked="true"
          class="lg:w-1/4 lg:mr-3"
          :label="'ФИО'"
        />
        <RadioButton
          @change.native="filterField = 'phoneNumber'"
          class="lg:w-1/4 lg:mr-3"
          :label="'Номер телефона'"
        />
        <RadioButton
          @change.native="filterField = 'email'"
          class="lg:w-1/4 lg:mr-3"
          :label="'Email адрес'"
        />
        <RadioButton
          @change.native="filterField = 'tag'"
          class="lg:w-1/4"
          :label="'Тег'"
        />
      </div>
      <div name="filter-input" class="flex justify-center mt-4">
        <div class="w-full mr-2">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="введите для фильтрации"
            v-model="filterQuery"
          />
        </div>
        <BaseButton @click.native="filterQuery = ''">очистить</BaseButton>
      </div>
    </div>

    <TheTable class="mt-3" @update-contact="(id) => updateContact(id)" />
  </div>
</template>
