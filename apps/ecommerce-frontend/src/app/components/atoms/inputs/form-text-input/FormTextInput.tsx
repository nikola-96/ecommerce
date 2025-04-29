import { FC } from 'react'
import { FormTextInputProps } from './FormTextInput.interface'
import { useController } from 'react-hook-form'
import { TextInput } from '../text-input'

export const FormTextInput: FC<FormTextInputProps> = props => {
  const { field } = useController(props)
  return <TextInput {...props} {...field} />
}
