// Vue Basics
import { createApp } from 'vue'
import App from './App.vue'
// Router
import router from "./router";

// Fancy stuff, Wave UI
import WaveUI from 'wave-ui';
import 'wave-ui/dist/wave-ui.css';

// custom css
import "./assets/main.css";

// font awesome
import 'font-awesome/css/font-awesome.min.css'

const app = createApp(App);

// Options go here, if necessary
new WaveUI(app, {
    colors: {
        // primary: "#BF7746",
    },
    notificationManager: {
        transition: 'twist'
    }
});


app.use(router).mount('#app');