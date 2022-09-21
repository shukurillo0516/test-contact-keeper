export function compareObjects(object1, object2, key, asc) {
  const obj1 = object1[key].toUpperCase();
  const obj2 = object2[key].toUpperCase();

  if (asc) {
    if (obj1 < obj2) {
      return -1;
    }
    if (obj1 > obj2) {
      return 1;
    }
    return 0;
  } else {
    if (obj1 < obj2) {
      return 1;
    }
    if (obj1 > obj2) {
      return -1;
    }
    return 0;
  }
}

export function updateStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
export function loadContacts() {}
