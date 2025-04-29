import { forwardRef, ForwardRefRenderFunction } from 'react';
import { TextInputProps } from './TextInput.interface';

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = (
  { label, ...props },
  ref
) => {
  return (
    <label
      htmlFor={props.id}
      className={
        props.labelclassname ?? 'input input-bordered flex items-center gap-2'
      }
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        ref={ref}
        {...props}
        id={props.id}
        value={props.value ?? ''}
        className={props.className}
      />
    </label>
  );
};

export default forwardRef(TextInput);
