// For Demonstration
// ---
// In order to run WebdriverIO and subsequently an instance of Chrome using
// continuous integration, particularly in this case, a GitHub Actions workflow,
// we need to run Google Chrome headless. Here we're pulling in the base config
// defined at wdio.conf.js and applying a new capabilities configuration that
// adds the headless configuration to Chrome. When running Chrome headless
// locally on a desktop environment, you will not be able to visibly see the
// tests running in the browser.

const baseConfig = require('./wdio.conf.js');

exports.config = Object.assign({}, baseConfig.config, {
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu'],
      },
    },
  ],
})