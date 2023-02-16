import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'kwkn34',
  e2e: {
    baseUrl: 'https://faksestoreapi.com/',
    requestTimeout: 10000,
    screenshotOnRunFailure: true,
    watchForFileChanges: false,
    screenshotsFolder: 'cypress/screenshots',
    downloadsFolder: 'cypress/downloads'
  }
});
