// Button
import { StyleButton } from './style';

const Button = ({
  className,
  onClick,
  color = 'primary',
  labelColor = 'back',
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
