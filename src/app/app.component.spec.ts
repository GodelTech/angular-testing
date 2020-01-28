import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';

import { BaseTest, EventHandler } from '@godeltech/angular-testing/public-api';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { ListModel } from './list.model';

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

    it('onItemClick: should deselect item', () => {
        const item = new ListModel({ isSelected: true });

        component.onItemClick(item);

        expect(item.isSelected).toBe(false);
    });

    it('onItemRemove: should remove second item', () => {
        const id = 2;

        component.onItemRemove(id);

        expect(component.items.length).toBe(2);
        expect(component.items.findIndex(x => x.id === id)).toBe(-1);
    });

    it('onItemCreate: should add forth item', () => {
        component.onItemCreate();

        expect(component.items.length).toBe(4);
    });

    it('toggle-btn element: should call app service', () => {
        fixture.detectChanges();
        const element = fixture.debugElement.query(By.css('.toggle-btn'));

        EventHandler.dblclick(element);

        expect(appServiceMock.showContainer).toHaveBeenCalledTimes(1);
    });

    describe('container element:', () => {
        it('should not be shown', () => {
            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.container'))).toBeFalsy();
        });

        it('should be shown', () => {
            component.showContainer = true;

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.container'))).toBeTruthy();
        });

        it('should be shown', () => {
            component.ngOnInit();
            appServiceMock.showContainer$.next(true);

            fixture.detectChanges();

            expect(fixture.debugElement.query(By.css('.container'))).toBeTruthy();
        });
    });

    describe('elements with class `selected`:', () => {
        beforeEach(() => {
            component.showContainer = true;
        });

        it('no one element should be selected', () => {
            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css('.selected')).length).toBe(0);
        });

        it('only one element should be selected', () => {
            component.items[0].isSelected = true;

            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css('.selected')).length).toBe(1);
        });

        it('two elements should be selected', () => {
            fixture.detectChanges();

            const elements = fixture.debugElement.queryAll(By.css('.item-name'));

            EventHandler.click(elements[0]);
            EventHandler.click(elements[2]);

            fixture.detectChanges();

            expect(fixture.debugElement.queryAll(By.css('.selected')).length).toBe(2);
        });
    });

    function resetMockedProviders(): void {
        appServiceMock.showContainer.calls.reset();
    }
});
