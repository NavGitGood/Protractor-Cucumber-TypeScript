const mkdir = require('mkdirp');
const path = require('path');
const reporter = require('cucumber-html-reporter');
const executionDate = new Date().toLocaleDateString().split('/').join('-');
const reportPath = path.join(process.cwd() + '/e2e/reports/' + executionDate);
const targetJsonPath = reportPath + '/cucumber_report.json';
const targetHtmlPath = reportPath + '/cucumber_report.html';

const cucumberReporterOptions = {
    jsonFile: targetJsonPath,
    output: targetHtmlPath,
    reportSuiteAsScenarios: true,
    theme: 'hierarchy'
}

exports.config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",
    // SELENIUM_PROMISE_MANAGER: false,
    baseUrl: "https://www.google.com",
    // directConnect: true,
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    reportPath: reportPath,

    capabilities: {
        browserName: "chrome",
    },

    specs: [
        "./e2e/features/*.feature",
    ],

    cucumberOpts: {
        require: [
            './e2e/step-definitions/*.ts',
            './e2e/support/*.ts'
        ],
        compiler: "ts:ts-node/register",
        format: 'json:./e2e/reports/' + executionDate + '/cucumber_report.json',
        plugin: [ "pretty" ],
        strict: true,
        monochrome: true,
        keepAlive: false,
        tags: "~@ignore"
    },

    beforeLaunch() {
        mkdir.sync(reportPath);

        // to use es6 syntax, like import keyword
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },

    onPrepare: () => {
        browser.manage().window().maximize();
        // Reporter.createDirectory(jsonReports);
    },

    onComplete: () => {
        reporter.generate(cucumberReporterOptions);
    },
};