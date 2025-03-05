import ButtonProps from '@type/Button';

const Button = ({
  variant = 'primary',
  size = 'medium',
  block = false,
  type,
  ...props
}: ButtonProps) => {
  const baseStyles = 'focus:outline-hidden transition';

  const variantStyles = {
    primary: 'rounded-[5px] bg-pink text-white font-bold',
    secondary:
      'rounded-[5px] border border-beige-primary text-brown-tertiary font-medium',
    tertiary:
      'rounded-[5px] bg-beige-tertiary text-brown-secondary font-medium',
    submit:
      'w-full rounded-full bg-pink text-white font-semibold text-[18px] p-[18px]',
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
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${blockStyles[block ? 'true' : 'false']}`}
      {...props}
    />
  );
};

export default Button;
