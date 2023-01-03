# Applitools Example: WebdriverIO 7 JavaScript with the Ultrafast Grid

This is the example project for the [WebdriverIO JavaScript tutorial](https://applitools.com/tutorials/quickstart/web/webdriverio/webdriverio-7).
It shows how to start automating visual tests with the [Applitools Eyes](https://applitools.com/platform/eyes/) and the [Ultrafast Grid](https://applitools.com/platform/ultrafast-grid/)
using [WebdriverIO](https://v7.webdriver.io/) in JavaScript.

It uses:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as the programming language
* [WebdriverIO v7](https://v7.webdriver.io/) for browser automation
* [Google Chrome](https://www.google.com/chrome/downloads/) as the local browser for testing
* [npm](https://www.npmjs.com/) for dependency management
* [Applitools Eyes](https://applitools.com/platform/eyes/) for visual testing

To run this example project, you'll need:

1. A free [Applitools account](https://auth.applitools.com/users/register).
2. The [Node.js](https://nodejs.org/en/) version 12 or higher.
3. A good JavaScript editor, such as [Visual Studio Code](https://code.visualstudio.com/).
4. [npm](https://www.npmjs.com/) (typically bundled with Node.js).
5. An up-to-date version of [Google Chrome](https://www.google.com/chrome/downloads/).
6. A corresponding version of [ChromeDriver](https://chromedriver.chromium.org/downloads).

To install project dependencies, run:

```
npm install
```

The main test case is [`acme-bank.test.js`](test/acme-bank.test.js).

To execute tests, set the `APPLITOOLS_API_KEY` environment variable
to your [account's API key](https://applitools.com/tutorials/getting-started/setting-up-your-environment.html),
and then run:

```
npm test
```

**For full instructions on running this project, take our
[WebdriverIO JavaScript tutorial](https://applitools.com/tutorials/quickstart/web/webdriverio/webdriverio-7)!**