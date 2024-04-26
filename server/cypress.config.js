import { defineConfig } from 'cypress'
import { configurePlugin } from 'cypress-mongodb';
export default defineConfig({
  env: {
    mongodb: {
      uri: 'mongodb://localhost:4000',
      database: 'projektas',
      collection: 'user'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    baseUrl: 'http://localhost:3000'
  }
});
