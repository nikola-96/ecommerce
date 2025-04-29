import { InputHTMLAttributes } from 'react'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  labelclassname?: string
}
