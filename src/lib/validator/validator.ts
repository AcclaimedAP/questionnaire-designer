import { type ValidatorType } from "./validator.type";



class ValidatorClass {
  private pattern: string;
  private result: ValidatorType.Result;
  private value: string | number | undefined;
  private config: ValidatorType.Configuration;
  //private blocks: Validator.Block[];
  private static defaultConfig: ValidatorType.Configuration = {
    required: false,
    char: "any",
    type: "string"
  };

  constructor(config?: ValidatorType.Configuration) {
    this.pattern = "";
    this.result = { isValid: false, message: "" };
    this.value = undefined;
    this.config = { ...ValidatorClass.defaultConfig, ...config };
    if (!["number", "custom"].includes(this.config.char)) {
      this.setPattern();
    }
  }


  public validate(value: string | number): ValidatorType.Result {
    this.value = value;
    // Check against config first
    if (!this.config.required) {
      if (this.valueIsEmpty()) {
        this.setValidResult();
        return this.getResult();
      }
    } else {
      if (this.valueIsEmpty()) {
        this.setInvalidResult("Mandatory field is empty");
        return this.getResult();
      }
    }
    if (this.config.char === "custom") {
      this.setInvalidResult("Custom character validation is not supported yet");
      return this.getResult();
    }
    if (this.config.type === "string") {
      this.validateAsString();
    }
    if (this.config.type === "number") {
      this.validateAsNumber();
    }
    return this.getResult();
  }

  private validateAsNumber() {
    const satisfies = this.satisfies();
    if (satisfies.min && satisfies.max) {
      this.setValidResult();
    } else {
      this.setInvalidResult(`Value has to be ${this.rangeString()}`);
    }
  }

  private validateAsString() {
    const satisfies = this.satisfies();
    if (!satisfies.min || !satisfies.max) {
      this.setInvalidResult(`Has to be ${this.rangeString()} characters long`);
      return;
    }
    const str = this.value as string;
    const result = str.match(this.pattern);
    if (result) {
      this.setValidResult();
    } else {
      this.setInvalidResult("Invalid character");
    }
  }

  private setPattern() {
    this.pattern = this.buildPattern(this.config.char, this.config.min, this.config.max);
  }


  private setValidResult() {
    this.result.isValid = true;
    this.result.message = "";
  }

  private setInvalidResult(message: string) {
    this.result.isValid = false;
    this.result.message = message;
  }

  private getResult() {
    return this.result;
  }

  private buildPattern(char: string, min: number | undefined, max: number | undefined) {
    return `^(${this.validationCharacter(char)}{${min || '0'},${max || ''}})$`;
  }

  private valueIsEmpty() {
    if (this.config.type === "string") {
      return typeof this.value === "string" && this.value.length === 0;
    }
    return !this.value;
  }

  private satisfies() {
    if (this.isString()) {
      return this.stringSatisfiesRange(this.value as string);
    }
    return this.numberSatisfiesRange(this.value as number);
  }

  private stringSatisfiesRange(value: string): { min: boolean, max: boolean } {
    return {
      min: this.config.min ?
        value.length >= this.config.min : true,
      max: this.config.max ?
        value.length <= this.config.max : true
    }
  }

  private numberSatisfiesRange(value: number): { min: boolean, max: boolean } {
    return {
      min: this.config.min ?
        value >= this.config.min : true,
      max: this.config.max ?
        value <= this.config.max : true
    }
  }

  private isString(): boolean {
    return this.config.type === "string";
  }

  private rangeString() {
    const min = this.config.min ? `${this.config.min}` : "";
    const max = this.config.max ? `${this.config.max}` : "";
    const range = min && max ? `between ${min} and ${max}` : min ? `atleast ${min}` : `equal or under ${max}`;
    return range;
  }

  private validationCharacter(char: string) {
    const charType: { [key: string]: string } = {
      number: "[0-9]",
      alphabetic: "[a-zA-Z]",
      alphanumeric: "[a-zA-Z0-9]",
      any: "."
    }
    return charType[char];
  }

}

export namespace Validator {
  export class Class extends ValidatorClass { };
  export namespace Types {
    export type Configuration = ValidatorType.Configuration;
    export type Result = ValidatorType.Result;
  }
}

export default Validator;