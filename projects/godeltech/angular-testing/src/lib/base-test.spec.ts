import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTest } from './base-test';

@Component({
  selector: 'lib-test',
  template: '<div>TestComponent</div>'
})
class TestComponent {

}
describe('BaseTest', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let configureTestingModuleSpy: jasmine.Spy;
  let compileComponentsSpy: jasmine.Spy;

  beforeAll(() => {
    configureTestingModuleSpy = spyOn(TestBed, 'configureTestingModule').and.callThrough();
    compileComponentsSpy = spyOn(TestBed, 'compileComponents').and.callThrough();
  });

  BaseTest.setupTestBed({
    declarations: [TestComponent]
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call spies only once', () => {
    fixture.detectChanges();

    expect(configureTestingModuleSpy).toHaveBeenCalledTimes(1);
    expect(compileComponentsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call spies only once', () => {
    fixture.detectChanges();

    expect(configureTestingModuleSpy).toHaveBeenCalledTimes(1);
    expect(compileComponentsSpy).toHaveBeenCalledTimes(1);
  });
});
