/**
 * Contact action which specifies what type of event should happen.
 */
export enum ContactActionType {
    /**
     * Should start a call action in the browser.
     */
    Phone,
    /**
     * Should open a new tab with Google Maps location specified.
     */
    Location,
    /**
     * Should start an action for sending an email.
     */
    Mail
}