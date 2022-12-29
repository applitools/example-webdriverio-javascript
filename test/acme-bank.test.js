'use strict';

const { Eyes, 
  VisualGridRunner, 
  RunnerOptions,
  Target, 
  RectangleSize, 
  Configuration, 
  BatchInfo,
  BrowserType,
  ScreenOrientation,
  DeviceName } = require('@applitools/eyes-webdriverio');

describe('ACME Bank', function () {
  // This WebdriverIO test case class contains everything needed to run a full visual test against the ACME bank site.
  // It runs the test once locally,
  // and then it performs cross-browser testing against multiple unique browsers in Applitools Ultrafast Grid.

  // Test control inputs to read once and share for all tests
  var applitoolsApiKey;

  // Applitools objects to share for all tests
  let batch;
  let config;
  let runner;

  // Test-specific objects
  let eyes;


  before(async () => {
    // This method sets up the configuration for running visual tests in the Ultrafast Grid.
    // The configuration is shared by all tests in a test suite, so it belongs in a `before` method.
    // If you have more than one test class, then you should abstract this configuration to avoid duplication. 

    // Read the Applitools API key from an environment variable.
    // To find your Applitools API key:
    // https://applitools.com/tutorials/getting-started/setting-up-your-environment.html
    applitoolsApiKey = process.env.APPLITOOLS_API_KEY;

    // Create the runner for the Ultrafast Grid.
    // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
    // Warning: If you have a free account, then concurrency will be limited to 1.
    runner = new VisualGridRunner(new RunnerOptions().testConcurrency(5));

    // Create a new batch for tests.
    // A batch is the collection of visual checkpoints for a test suite.
    // Batches are displayed in the dashboard, so use meaningful names.
    batch = new BatchInfo('Applitools Example: WebdriverIO JavaScript with the Ultrafast Grid');

    // Create a configuration for Applitools Eyes.
    config = new Configuration();
    
    // Set the Applitools API key so test results are uploaded to your account.
    // If you don't explicitly set the API key with this call,
    // then the SDK will automatically read the `APPLITOOLS_API_KEY` environment variable to fetch it.
    config.setApiKey(applitoolsApiKey);

    // Set the batch for the config.
    config.setBatch(batch);

    // Add 3 desktop browsers with different viewports for cross-browser testing in the Ultrafast Grid.
    // Other browsers are also available, like Edge and IE.
    config.addBrowser(800, 600, BrowserType.CHROME);
    config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    config.addBrowser(1024, 768, BrowserType.SAFARI);

    // Add 2 mobile emulation devices with different orientations for cross-browser testing in the Ultrafast Grid.
    // Other mobile devices are available, including iOS.
    config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
  });
  
  
  beforeEach(async function () {
    //This method sets up each test with its own ChromeDriver and Applitools Eyes objects.
    // Even though this test will run visual checkpoints on different browsers in the Ultrafast Grid,
    // it still needs to run the test one time locally to capture snapshots.
    
    // Create the Applitools Eyes object connected to the ClassicRunner and set its configuration.
    eyes = new Eyes(runner);
    eyes.setConfiguration(config);

    // Open Eyes to start visual testing.
    // It is a recommended practice to set all four inputs:
    browser = await eyes.open(
        browser,                             // WebDriver to "watch"
        'ACME Bank',                        // The name of the app under test
        this.currentTest.fullTitle(),       // The name of the test case
        new RectangleSize(1024, 768)         // The viewport size for the local browser
    );
  });
  
  it('should log into a bank account', async () => {
    // This test covers login for the Applitools demo site, which is a dummy banking app.
    // The interactions use typical Selenium calls,
    // but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
    // Traditional assertions that scrape the page for text values are not needed here.

    // Load the login page.
    await browser.url('https://demo.applitools.com');

    // Verify the full login page loaded correctly.
    await eyes.check(Target.window().fully().withName("Login page"));
    
    // Perform login.
    await browser.$("#username").setValue("andy");
    await browser.$("#password").setValue("i<3pandas");
    await browser.$("#log-in").click();

    // Verify the full main page loaded correctly.
    // This snapshot uses LAYOUT match level to avoid differences in closing time text.
    await eyes.check(Target.window().fully().withName("Main page").layout());
  });
  
  afterEach(async () => {

    // Quit the WebdriverIO instance
    await browser.closeWindow();

    // Close Eyes to tell the server it should display the results.
    await eyes.closeAsync();

    // Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
    // You will need to check the Applitools dashboard for visual results per checkpoint.
    // Note that "unresolved" and "failed" visual checkpoints will not cause the Mocha test to fail.

    // If you want the ACME demo app test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
    // If any checkpoints are unresolved or failed, then `eyes.close()` will make the ACME demo app test fail.
  });
  
  after(async () => {
    // Close the batch and report visual differences to the console.
    // Note that it forces Mocha to wait synchronously for all visual checkpoints to complete.
    const allTestResults = await runner.getAllTestResults();
    console.log(allTestResults);
  });
  
});
