import { DebugElement } from '@angular/core';

import { ButtonClickEvents, ScrollEvents } from './event-options.const';
import { EventHandler } from './event-handler';

describe('EventHandler', () => {
    describe('click:', () => {
        it('should call triggerEventHandler spy with default event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.click(element);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('click', ButtonClickEvents.left);
        });

        it('should call triggerEventHandler spy with custom event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.click(element, ButtonClickEvents.right);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('click', ButtonClickEvents.right);
        });

        it('should call click spy', () => {
            const element = document.createElement('div');
            spyOn(element, 'click');

            EventHandler.click(element);

            expect(element.click).toHaveBeenCalledTimes(1);
        });
    });

    describe('dblclick:', () => {
        it('should call triggerEventHandler spy with default event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.dblclick(element);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('dblclick', ButtonClickEvents.left);
        });

        it('should call triggerEventHandler spy with custom event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.dblclick(element, ButtonClickEvents.right);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('dblclick', ButtonClickEvents.right);
        });

        it('should call dblclick spy', () => {
            const element = document.createElement('div');
            spyOn(element, 'ondblclick');

            EventHandler.dblclick(element);

            expect(element.ondblclick).toHaveBeenCalledTimes(1);
        });
    });

    describe('scroll:', () => {
        it('should call triggerEventHandler spy with default event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.scroll(element);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('scroll', ScrollEvents.scrollDown);
        });

        it('should call scroll spy', () => {
            const element = document.createElement('div');
            spyOn(element, 'scroll');

            EventHandler.scroll(element);

            expect(element.scroll).toHaveBeenCalledTimes(1);
        });
    });

    describe('submit:', () => {
        it('should call triggerEventHandler spy with default event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.submit(element);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('submit', ButtonClickEvents.left);
        });

        it('should call triggerEventHandler spy with custom event option', () => {
            const element = new DebugElement();
            spyOn(element, 'triggerEventHandler');

            EventHandler.submit(element, ButtonClickEvents.right);

            expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
            expect(element.triggerEventHandler).toHaveBeenCalledWith('submit', ButtonClickEvents.right);
        });

        it('should call submit spy', () => {
            const element = document.createElement('form');
            spyOn(element, 'submit');

            EventHandler.submit(element);

            expect(element.submit).toHaveBeenCalledTimes(1);
        });
    });

    it('focus: should call triggerEventHandler spy with default event option', () => {
        const element = new DebugElement();
        spyOn(element, 'triggerEventHandler');

        EventHandler.focus(element);

        expect(element.triggerEventHandler).toHaveBeenCalledTimes(1);
        expect(element.triggerEventHandler).toHaveBeenCalledWith('focus', {});
    });
});
