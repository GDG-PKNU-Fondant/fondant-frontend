import ButtonProps from '@type/Button';

const Button = ({
  variant = 'primary',
  size = 'medium',
  block = false,
  disabled = false,
  type,
  ...props
}: ButtonProps) => {
  const baseStyles = 'focus:outline-hidden transition';

  const variantStyles = {
    primary: `rounded-[5px] ${
      disabled ? 'bg-pink/33' : 'bg-pink cursor-pointer'
    } text-white font-bold`,
    secondary: `rounded-[5px] border ${
      disabled
        ? 'border-beige-primary/33 text-brown-tertiary/33'
        : 'border-beige-primary text-brown-tertiary cursor-pointer'
    } font-medium`,
    tertiary: `rounded-[5px] ${
      disabled
        ? 'bg-beige-tertiary/33 text-brown-secondary/33'
        : 'bg-beige-tertiary text-brown-secondary cursor-pointer'
    } font-medium`,
    submit: `w-full rounded-full ${
      disabled ? 'bg-pink/33' : 'bg-pink cursor-pointer'
    } text-white font-semibold text-[18px] p-[15px]`,
  };

  const sizeStyles = {
    small: 'p-[5px] text-[12px]',
    medium: 'p-[9px] text-[13px]',
    large: 'p-[15px] text-[18px]',
  };

  const blockStyles = {
    true: 'w-full',
    false: 'inline-block',
  };

  return (
    <button
      type={variant === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${blockStyles[block ? 'true' : 'false']}`}
      {...props}
    />
  );
};

export default Button;
