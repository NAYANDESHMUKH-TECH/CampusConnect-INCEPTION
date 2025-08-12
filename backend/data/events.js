let events = [];
let idCounter = 1;

function getAll() {
  return events;
}

function getById(id) {
  return events.find(e => e.id === id);
}

function create({ title, description = '', date, category = '', posted_by = '' }) {
  const ev = { id: idCounter++, title, description, date, category, posted_by };
  events.push(ev);
  return ev;
}

function update(id, patch) {
  const ev = getById(id);
  if (!ev) return null;
  Object.assign(ev, patch);
  return ev;
}

function remove(id) {
  const before = events.length;
  events = events.filter(e => e.id !== id);
  return events.length < before;
}

module.exports = { getAll, getById, create, update, remove };
