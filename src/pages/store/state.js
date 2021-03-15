const state = {
  user: {
    id: "8888",
    name: "",
    token: ""
  },
};
if (window.localStorage["VUE_DEMO_USER"]) {
  // state.user = JSON.parse(window.localStorage["VUE_DEMO_USER"]);
}
export default state;