# Playwright Testing Project

This repository contains everything you need to use codegen on Playwright.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-organization/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install Playwright and all necessary browsers.

### 3. Set Up Environment Variables

Copy the example environment file to create your own:

```bash
cp .env.example .env
```

Open the `.env` file in a text editor and update the values:

```
BASE_URL=https://your-app-url.com
USERNAME=your-username
PASSWORD=your-password
```

## Running Codegen

### Run a test using the chrome project

This will open up a browser window, login if there is no saved session `storageState.json`, then take you to the Home page.

```bash
npx playwright test tests/codegen.spec.ts --project=chrome 
```

You can alternatively just use the codegen tag like this:
```bash
npx playwright codegen --ignore-https-errors --load-storage=storageState.json https://10.90.10.16/path/to/whatever
```

This will open a browser window in Chrome (with ignore https errors and session info), take you directly to the page you want and open a separate debugging window.

### The await page.pause(); Function
This line will stop the test and open the debugging tool in a separate window.

## Authentication

This project uses a global setup to handle authentication. The first time you run tests, it will:

1. Launch a browser
2. Navigate to the login page
3. Authenticate using credentials from your `.env` file
4. Save the authentication state for future test runs

The saved authentication state is stored in `storageState.json`. If you need to force a re-login, simply delete this file.

## Configuration

The project is configured with:

- Chrome browser
- Maximized browser window
- HTTPS error handling
- No automatic HTML reports

You can modify these settings in `playwright.config.ts`. I tried to be as specific as possible so most of the settings are in the `chrome` project in `projects`. All of the settings in the `chrome` project will only apply to tests run with the --project=chrome option and everything directly in `defineConfig()` will apply to all projects and tests. 

## Troubleshooting

### Certificate Errors

The tests are configured to ignore HTTPS certificate errors. If you're still experiencing issues, make sure the `ignoreHTTPSErrors: true` setting is present in both the global setup and the Playwright configuration.

### Authentication Issues

If tests fail with login errors:
1. Delete the `storageState.json` file to force a fresh login
2. Check your `.env` credentials

## Adding New Tests Using Codegen

To create a new test:

- Add a new file in the `tests` directory with a `.spec.ts` extension
- Use the Playwright test generator to help create tests:
1. Create or add to an existing `.spec.ts` file. Copy the contents of `codegen.spec.ts` and paste them into the new file if you created a new test file.
2. Put all of your tests inside the `test()` block. 
3. Add `await page.pause();` where you want to open the debugging window to add generated steps.
4. Click Record in the debugging window if it is not already recording.
5. Interact with the browser window. Each action will populate the debugging window.
6. Copy the recorded steps and paste into the file. 
7. Close the codegen browser window. 
## Debug Window

You can record actions, pick locators, interact with pages and basically everything you would do with a browser using the Playwright debug tool. Refer to the playwright codegen doc below for specifics.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Playwright Codegen doc](https://playwright.dev/python/docs/codegen)

