import Vue from "vue"
import App from "./app.vue";
import router from "./router";
import "./registration"

new Vue({
    router,
    render: h => h(App)
}).$mount("#app")
