// Button
import { StyleButton } from './style';

const Button = ({
  className,
  onClick,
  color = 'primary',
  labelColor = 'buttonText',
  ...restProps
}) => {
  return (
    <StyleButton
      $color={color}
      $labelColor={labelColor}
      onClick={onClick}
      className={`btn ${className}`}
      {...restProps}
    />
  );
};

export default Button;
