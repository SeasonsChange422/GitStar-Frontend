/*
 * @Author: Dhx
 * @Date: 2025-01-08 16:01:27
 * @Description: 
 * @FilePath: \GitStar-Frontend\src\main.ts
 */
/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
// import 'reset-css';
import 'github-markdown-css/github-markdown.css';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
