import ReeValidate from 'ree-validate';

export class ValidationErrors {
  constructor(validator, directErrors) {
    this.directErrors = directErrors;
    this.validator = validator;
  }

  has(field) {
    return (this.hasValidateErrors(field) || this.hasDirectErrors(field));
  }

  hasValidateErrors(field) {
    return this.validator.errors.has(field);
  }

  hasDirectErrors(field) {
    return this.directErrors && typeof this.directErrors[field] !== 'undefined';
  }

  first(field) {
    if (this.hasValidateErrors(field)) {
      return this.validator.errors.first(field);
    }

    if (this.hasDirectErrors(field)) {
      return this.directErrors[field][0];
    }
    return null;
  }

  remove(field) {
    this.validator.errors.remove(field);
    if (this.hasDirectErrors(field)) {
      delete this.directErrors[field];
    }
  }
}

class ValidationHelper {
  constructor(rules, directErrors = []) {
    this.validator = new ReeValidate(rules);
    this.directErrors = directErrors;
  }

  setDirectErrors(errors = []) {
    this.directErrors = errors;
  }

  get errors() {
    return new ValidationErrors(this.validator, this.directErrors);
  }

  validate(field, value) {
    return this.validator.validate(field, value);
  }

  validateAll(values) {
    return this.validator.validateAll(values);
  }
}

export default ValidationHelper;
