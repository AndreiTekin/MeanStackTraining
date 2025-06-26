function validateBookFields(title, author) {
if (!title || !author) {
  return false;
}
if (!title.trim() || !author.trim()) {
  return false;
}
return true;
}

module.exports = { validateBookFields };
