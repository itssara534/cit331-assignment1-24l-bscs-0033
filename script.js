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
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const data = new FormData(form);
  const registration = {
    name: data.get("name").trim(),
    email: data.get("email"),
    phone: data.get("phone"),
    event: data.get("event"),
    source: data.get("source")
  };

  const items = loadRegistrations();
  items.push(registration);
  saveRegistrations(items);

  form.reset();
  message.textContent = "Thanks, " + registration.name + "! You are registered.";
});
// Show each registration. textContent keeps the text as plain text.
function render() {
  const items = loadRegistrations();
  list.innerHTML = "";

  if (items.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No registrations saved yet.";
    list.appendChild(empty);
    return;
  }

  items.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.name + " (" + item.email + "), " + item.event + ", heard via " + item.source;
    list.appendChild(li);
  });
}

clearButton.addEventListener("click", function () {
  localStorage.removeItem(STORAGE_KEY);
  message.textContent = "All registrations were cleared.";
  render();
});

render();