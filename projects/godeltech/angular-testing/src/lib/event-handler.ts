import { DebugElement } from '@angular/core';

import { ButtonClickEvents, ScrollEvents } from './event-options.const';

export class EventHandler {
    /**
     * Simulate element single click.
     * Default option is mouse left-button event click.
     * @param element Target element.
     * @param eventObj Event option.
     */
    public static click(element: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
        element instanceof HTMLElement
            ? element.click()
            : element.triggerEventHandler('click', eventObj);
    }

    /**
     * Simulate element dblclick.
     * Default option is mouse left-button event click.
     * @param element Target element.
     * @param eventObj Event option.
     */
    public static dblclick(element: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
        element instanceof HTMLElement
            ? element.ondblclick(new MouseEvent('event'))
            : element.triggerEventHandler('dblclick', eventObj);
    }

    /**
     * Simulate element scroll via mousewheel.
     * Default option is scroll down event.
     * @param element Target element.
     * @param eventObj Event option.
     */
    public static scroll(element: DebugElement | HTMLElement, eventObj: any = ScrollEvents.scrollDown): void {
        element instanceof HTMLElement
            ? element.scroll()
            : element.triggerEventHandler('scroll', eventObj);
    }

    /**
     * Simulate form submit.
     * Default option is mouse left-button event click.
     * @param element Target element.
     * @param eventObj Event option.
     */
    public static submit(element: DebugElement | HTMLFormElement, eventObj: any = ButtonClickEvents.left): void {
        element instanceof HTMLFormElement
            ? element.submit()
            : element.triggerEventHandler('submit', eventObj);
    }

    /**
     * Simulate element focus
     * @param element Target element.
     * @param eventObj Event option.
     */
    public static focus(element: DebugElement, eventObj: any = {}): void {
        element.triggerEventHandler('focus', eventObj);
    }
}
