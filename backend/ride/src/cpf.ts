const CPF_DIVISOR = 11
const CPF_WEIGHT_FIRST_CHECK_DIGIT = 10
const CPF_WEIGHT_SECOND_CHECK_DIGIT = CPF_DIVISOR

function sanitizeString(input: string) {
  return input
    .replace(/\./g, '')
    .replace(/\-/g, '')
    .replace(/\s/g, '')
}

function isValidLength(sanitizedInput: string) {
  return sanitizedInput.length === 11
}

function isIdenticalCharacters(input: string) {
  return input.split('').every(char => char === input[0])
}

function extractCheckDigits(sanitizedInput: string) {
  return sanitizedInput.substring(sanitizedInput.length - 2, sanitizedInput.length)
}

function extractBaseDigits(sanitizedInput: string) {
  return sanitizedInput.substring(0, sanitizedInput.length - 2)
}

function calculateAccumulatorCheckDigits(digits: string) {
  return Array.from(digits, Number).reduce(({ accFirstCheckDigit, accSecondCheckDigit }, digit, i) => {
    return {
      accFirstCheckDigit: accFirstCheckDigit + (CPF_WEIGHT_FIRST_CHECK_DIGIT - i) * digit,
      accSecondCheckDigit: accSecondCheckDigit + (CPF_WEIGHT_SECOND_CHECK_DIGIT - i) * digit,
    }
  }, { accFirstCheckDigit: 0, accSecondCheckDigit: 0 })
}

function calculateCheckDigit(accumulator: number) {
  const rest = accumulator % CPF_DIVISOR
  return rest < 2 ? 0 : CPF_DIVISOR - rest
}

export function validate(cpf: string) {
  const sanitizedCPF = sanitizeString(cpf)
  if (!isValidLength(sanitizedCPF) || isIdenticalCharacters(sanitizedCPF)) { return false }
  const baseDigits = extractBaseDigits(sanitizedCPF)
  const { accFirstCheckDigit, accSecondCheckDigit } = calculateAccumulatorCheckDigits(baseDigits)
  const firstCheckDigit = calculateCheckDigit(accFirstCheckDigit)
  const secondCheckdigit = calculateCheckDigit(firstCheckDigit * 2 + accSecondCheckDigit)
  const targetCheckDigits = `${firstCheckDigit}${secondCheckdigit}`
  return extractCheckDigits(sanitizedCPF) === targetCheckDigits
}
