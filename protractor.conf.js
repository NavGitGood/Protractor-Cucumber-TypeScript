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

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://www.google.com",
    directConnect: true,

    capabilities: {
        browserName: "chrome",
    },

    cucumberOpts: {
        require: [
            './e2e/step-definitions/*.ts'
        ],
        compiler: "ts:ts-node/register",
        format: 'json:./e2e/reports/' + executionDate + '/cucumber_report.json',
        plugin: [ "pretty" ],
        strict: true,
        monochrome: true,
        keepAlive: false
        // tags: "@CucumberScenario or @ProtractorScenario or @TypeScriptScenario or @OutlineScenario or @AngularScenario",
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "./e2e/features/*.feature",
    ],

    beforeLaunch() {
        mkdir.sync(reportPath);

        // to use es6 syntax, like import keyword
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
        // Reporter.createDirectory(jsonReports);
    },

    onComplete: () => {
        reporter.generate(cucumberReporterOptions);
    },
};