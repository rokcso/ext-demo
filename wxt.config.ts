import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['storage', 'notifications', 'activeTab', 'scripting'],
    action: {
      default_title: "Todo List Manager"
    },
  },
  webExt: {
    chromiumArgs: ['--user-data-dir=./.wxt/browser-data']
  }
});
