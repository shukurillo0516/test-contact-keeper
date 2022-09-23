<script setup>
import { ref } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import redButton from "./RedButton.vue";

const store = useStore();
const contacts = computed(() => store.state.contacts);
const fields = ref(["fullName", "phoneNumber", "email", "tag"]);

let selectedItems = ref([]);
function selectItem(id) {
  let idIndex = selectedItems.value.indexOf(id);
  if (idIndex > -1) {
    selectedItems.value.splice(idIndex, 1);
  } else {
    selectedItems.value.push(id);
  }
}

function deleteItems() {
  store.commit("deleteContacts", selectedItems.value);
  selectedItems.value = [];
}

const emit = defineEmits(["updateContact"]);

function updateItem(id) {
  emit("updateContact", id);
}

function filterContacts(field, asc) {
  let payload = { field, asc };
  store.commit("filterContactsByColumn", payload);
}
</script>

<template>
  <redButton :disabled="!selectedItems.length" @click.native="deleteItems()"
    >удалить</redButton
  >

  <div class="overflow-x-auto relative drop-shadow-lg sm:rounded-lg border">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="py-3 px-6">
            <span class="sr-only">Check</span>
          </th>
          <th scope="col" class="py-3 px-6">
            ФИО
            <span>
              <div
                class="icon-sort-asc"
                @click="filterContacts('fullName', true)"
              ></div>
              <div
                class="icon-sort-desc"
                @click="filterContacts('fullName', false)"
              ></div>
            </span>
          </th>
          <th scope="col" class="py-3 px-6">
            Номер телефона
            <span>
              <div
                class="icon-sort-asc"
                @click="filterContacts('phoneNumber', true)"
              ></div>
              <div
                class="icon-sort-desc"
                @click="filterContacts('phoneNumber', false)"
              ></div>
            </span>
          </th>
          <th scope="col" class="py-3 px-6">
            Email адрес
            <span>
              <div
                class="icon-sort-asc"
                @click="filterContacts('email', true)"
              ></div>
              <div
                class="icon-sort-desc"
                @click="filterContacts('email', false)"
              ></div>
            </span>
          </th>
          <th scope="col" class="py-3 px-6">
            Тег
            <span>
              <div
                class="icon-sort-asc"
                @click="filterContacts('tag', true)"
              ></div>
              <div
                class="icon-sort-desc"
                @click="filterContacts('tag', false)"
              ></div>
            </span>
          </th>
          <th scope="col" class="py-3 px-6">
            <span class="sr-only">Изменить</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="(contact, index) in contacts"
          :key="index"
        >
          <div class="flex items-center py-4 px-6">
            <input
              type="checkbox"
              class="text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="selectItem(contact.id)"
              :checked="selectedItems.indexOf(contact.id) > -1"
            />
          </div>
          <td
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            v-for="(field, id) in fields"
            :key="id"
          >
            {{ contact[field] }}
          </td>
          <td
            class="py-4 px-6 font-large font-bold text-blue-600 whitespace-nowrap dark:text-white cursor-pointer"
            @click="updateItem(contact.id)"
          >
            изменить
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.icon-arrow {
  display: inline-block;
  height: 0;
  width: 0;
  border-style: solid;
  border-color: transparent;
  cursor: pointer;
}

.icon-sort-desc {
  @extend .icon-arrow;
  border-width: 12px 7px 0;
  border-top-color: #444444;
}

.icon-sort-asc {
  @extend .icon-arrow;
  border-width: 0 7px 12px;
  border-bottom-color: #444444;
}
</style>
