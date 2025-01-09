interface IResult {
  isValid: boolean;
  message: string;
}

interface IConfiguration {
  type: "string" | "number";
  required: boolean;
  min?: number;
  max?: number;
  char: "number" | "alphabetic" | "alphanumeric" | "any" | "custom"
}

interface IBlock {
  from?: number | string;
  to?: number | string;
  char: "number" | "alphabetic" | "alphanumeric" | "any" | "custom",
  mandatoryCharacters: string[]
}

export namespace ValidatorType {
  export type Result = IResult;
  export type Configuration = IConfiguration;
  export type Block = IBlock;
}