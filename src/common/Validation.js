export default class Validation {
  static isStringValid(value) {
    if (value !== undefined && value !== null && value.trim() !== '') {
      return true;
    }
    return false;
  }
}
