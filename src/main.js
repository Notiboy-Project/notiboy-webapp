import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MainPane from "./components/MainPane";
import Header from "./components/Header";

require("./assets/css/main.css");
const app = createApp(App);

app.component("main-pane", MainPane);
app.component("main-header", Header);
app.use(store).use(router).mount("#app");
