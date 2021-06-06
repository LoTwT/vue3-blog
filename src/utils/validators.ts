interface Rule {
  type: "required" | "length"
}

interface Require extends Rule {
  type: "required"
}

interface Length extends Rule {
  type: "length",
  options: MinMaxOptions
}

interface MinMaxOptions {
  min: number,
  max: number
}

type Validator = Require | Length

export interface Status {
  valid: boolean,
  errorMessage?: string
}

export const required = (): Require => ({ type: "required" })
export const length = (options: MinMaxOptions): Length => ({ type: "length", options })
export const validate = (value: string, validators: Validator[]): Status => {
  for (const validator of validators) {
    if (validator.type === "required" && (!value || !value.length)) {
      return {
        valid: false,
        errorMessage: "该表单的内容为必填项"
      }
    }

    if (validator.type === "length" && (value.length < validator.options.min || value.length > validator.options.max)) {
      return {
        valid: false,
        errorMessage: `字段长度须在 ${validator.options.min} - ${validator.options.max} 之间`
      }
    }
  }

  return { valid: true }
}