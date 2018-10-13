# Protractor-Cucumber-TypeScript
UI automation framework for Protractor (TypeScript)
For jenkins job, create a batch file with content:
set PathName="path to your gulp task"
cd /d %PathName%
@echo off
title Command Executer
color 1b
call gulp default

In jenkins, add Windows Exe Runner Plugin and in Configure System, add Environment variable PATH with value as path to your node and npm installation folders e.g. C:\Users\NAV\AppData\Roaming\npm;D:\eclipse\node js;

Add new job for you project and in build, add a build step "Execute Windows Batch Command" and add:
call "N:\Protractor_Cucumber_Typescript\jenkins_job.bat" %py% %p%
