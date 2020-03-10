# @godeltech/angular-testing

## Build

[![Azure DevOps builds (master)](https://godeltech.visualstudio.com/OpenSource/_apis/build/status/angular-testing?branchName=master)](https://dev.azure.com/GodelTech/OpenSource/_build/latest?definitionId=53&branchName=master)
[![Azure DevOps tests (master)](https://godeltech.visualstudio.com/OpenSource/_apis/tests/status/angular-testing?branchName=master)](https://dev.azure.com/GodelTech/OpenSource/_build/latest?definitionId=53&branchName=master)
[![Azure DevOps coverage (master)](https://godeltech.visualstudio.com/OpenSource/_apis/caverage/status/angular-testing?branchName=master)](https://dev.azure.com/GodelTech/OpenSource/_build/latest?definitionId=53&branchName=master)
[![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/angular-testing?server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/dashboard?id=angular-testing)
[![Sonar Tech Debt](https://img.shields.io/sonar/tech_debt/angular-testing?server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/dashboard?id=angular-testing)
[![Sonar Violations](https://img.shields.io/sonar/violations/angular-testing?format=long&server=https%3A%2F%2Fsonarcloud.io&style=flat-square)](https://sonarcloud.io/dashboard?id=angular-testing)

## Introduction

Angular package that helps to easily setup BeforeAll TestBed configuration. It allows you to improve the speed of tests run by 3-5 times and without any changes in your existing tests.
Also it has methods helpers to trigger common html event actions.

## Installation

```
$ npm i @godeltech/angular-testing
```

## Description

By default angular offers you to setup TestBed configureTestingModule before each test. You can increase tests execution speed with single setup configuration for all tests in file, but creating an instance as well will be before each test as the main rule in unit testing.

For comparison I took one component with simle functionality, see [demo](https://github.com/GodelTech/angular-testing/tree/master/src) project, covered it with 11 tests, firstly with BeforeEach setup and then with BeforeAll. I duplicated them in 30 files with 110 tests in each of them. The result was 3300 tests with each of the setups. All tests are the same for all setups, just configuration is different.

In the sheet below you can see time duration in seconds for building karma configuration, tests run and total sum.

| Setup configuration | Number of tests | Build run | Tests run | Total |
| ------------- |:---------------:| ---------:|----------:|------:|
| BeforeEach    | 3300            | 30        | 72        | 102   |
| BeforeEach    | 1650            | 29        | 30        | 59    |
| BeforeEach    | 1100            | 29        | 18        | 47    |
| BeforeAll     | 3300            | 28        | 18.5      | 46.5  |
| BeforeAll     | 1650            | 28        | 7         | 35    |
| BeforeAll     | 1100            | 28        | 3         | 31    |

## Usage

Replace `beforeEach` setup with `BaseTest.setupTestBed`
```
beforeEach(() => TestBed.configureTestingModule(moduleDef: TestModuleMetadata));
```

```
BaseTest.setupTestBed(moduleDef: TestModuleMetadata)
```

## Example

```
import { BaseTest, EventHandler } from '@godeltech/angular-testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    BaseTest.setupTestBed({
        declarations: [AppComponent]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create an instance', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
```

#### Look at the [demo](https://github.com/GodelTech/angular-testing/tree/master/src) project to see more examples

## EventHadnler Helper

* **click** - Simulate element single click. Default option is mouse left-button event click.
* **dblclick** - Simulate element dblclick click. Default option is mouse left-button event click.
* **scroll** - Simulate element scroll via mousewheel. Default option is scroll down event.
* **submit** - Simulate form submit. Default option is mouse left-button event click.
* **focus** - Simulate element focus.

In template
```
<button class="toggle-btn" (click)="onContainerToggle()">home</button>
```

In component
```
showContainer: boolean;

onContainerToggle(): void {
    this.service.showContainer(!this.showContainer);
}
```

In tests
```
it('toggle-btn element: should call app service', () => {
    // arrange
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('.toggle-btn'));

    // act
    EventHandler.click(element);

    // assert
    expect(appServiceMock.showContainer).toHaveBeenCalledTimes(1);
});
```

## Additional Information

As a result of usage single setup configuration for all tests in file you should use global variables for yor providers. It means that after each test your setuped providers are not overwritten. Don't forget to reset values of your global variables.

```
describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    const appServiceMock = {
        showContainer: jasmine.createSpy('showContainer'),
        showContainer$: new Subject<boolean>()
    };

    BaseTest.setupTestBed({
        declarations: [AppComponent],
        providers: [{ provide: AppService, useValue: appServiceMock }],
        schemas: [NO_ERRORS_SCHEMA]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        resetMockedProviders();
    });

    afterEach(() => {
        fixture.destroy();
    });
    
    it('should create an instance', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
    
    function resetMockedProviders(): void {
        appServiceMock.showContainer.calls.reset();
    }
});
```
