import { validate } from '../src/cpf'

test('Must return TRUE when a correctly formatted and valid CPF is provided', () => {
  let cpf = '529.982.247-25'
  expect(validate(cpf)).toBe(true)
  cpf = '52998224725'
  expect(validate(cpf)).toBe(true)
  cpf = '529 982 247 25'
  expect(validate(cpf)).toBe(true)
  cpf = '111.444.777-35'
  expect(validate(cpf)).toBe(true)
})

test('Must return FALSE when the CPF contains identical digits', () => {
  const cpf = '111.111.111-11'
  expect(validate(cpf)).toBe(false)
})

test('Must return FALSE when the CPF contains more than 14 digits or less than 11 digits', () => {
  let cpf = '529982247253'
  expect(validate(cpf)).toBe(false)
  cpf = '12.345.678-90'
  expect(validate(cpf)).toBe(false)
  cpf = '529.982.24'
  expect(validate(cpf)).toBe(false)
  cpf = '529.982.247-2511'
  expect(validate(cpf)).toBe(false)
})

test('Must return FALSE when the CPF has an incorrect check digit', () => {
  let cpf = '529.982.247-24'
  expect(validate(cpf)).toBe(false)
  cpf = '123.456.789-00'
  expect(validate(cpf)).toBe(false)
  cpf = '529.000.247-33'
  expect(validate(cpf)).toBe(false)
  cpf = '52998224722'
  expect(validate(cpf)).toBe(false)
})

test('Must return FALSE when the CPF contains characters that are not digits', () => {
  let cpf = '529.982.24A-25'
  expect(validate(cpf)).toBe(false)
  cpf = '52B.98C.247-25'
  expect(validate(cpf)).toBe(false)
})
