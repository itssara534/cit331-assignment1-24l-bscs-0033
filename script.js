// Campus Photo Society: save registrations in localStorage.
const STORAGE_KEY = "photoRegistrations";
const form = document.querySelector("#register-form");
const message = document.querySelector("#message");
const list = document.querySelector("#saved-list");
const clearButton = document.querySelector("#clear-all");

// Read saved registrations. Return an empty list if nothing is saved or the data is damaged.
function loadRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveRegistrations(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}