import { StyleInput } from './style';

const Input = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled,
  required,
  className,
  ...props
}) => {
  return (
    <StyleInput
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      disabled={disabled}
      required={required}
      className={className}
      {...props}
    />
  );
};

export default Input;
