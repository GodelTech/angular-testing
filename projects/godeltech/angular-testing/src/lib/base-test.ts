import { TestBed, TestModuleMetadata } from '@angular/core/testing';

const resetTestingModule = TestBed.resetTestingModule;
const preventAngularFromResetting = () => TestBed.resetTestingModule = () => TestBed;
const allowAngularToReset = () => TestBed.resetTestingModule = resetTestingModule;

// @dynamic
export class BaseTest {
    /**
     * TestBed configuration with single setup option.
     */
    public static setupTestBed = (moduleDef: TestModuleMetadata) => {
      // @ts-ignore
        beforeAll(done =>
            (async () => {
                resetTestingModule();
                preventAngularFromResetting();
                TestBed.configureTestingModule(moduleDef);
                await TestBed.compileComponents();
                TestBed.resetTestingModule = () => TestBed;
            })().then(done)
                .catch(done.fail)
        );

      // @ts-ignore
        afterAll(() => allowAngularToReset());
    }
}
