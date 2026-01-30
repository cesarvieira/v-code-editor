import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { VCodeEditor } from '../src/index';

import App from './App.vue';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
app.use(createVuetify({
  components: {
    ...components,
    VCodeEditor,
  },
  directives,
}));
// app.component('VCodeEditor', VCodeEditor);
app.mount('#app');
