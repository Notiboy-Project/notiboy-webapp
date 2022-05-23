import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MainPane from "./components/MainPane";

require("./assets/css/main.css");
const app = createApp(App)

app.component('main-pane', MainPane);
app.use(store).use(router).mount("#app");
