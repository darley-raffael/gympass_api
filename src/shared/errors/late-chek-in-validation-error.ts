export class LateCheckInValidationError extends Error {
  constructor() {
    super("The check-in can be only validated up to 20 minutes.");
  }
}