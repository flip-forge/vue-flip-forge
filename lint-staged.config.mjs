export default {
  "*": "prettier --check",
  "*.{vue,js,ts}": "eslint --max-warnings=0",
  "*.{vue,ts}": () => "vue-tsc --build --force --noEmit",
};
