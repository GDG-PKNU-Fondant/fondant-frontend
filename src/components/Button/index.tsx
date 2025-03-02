import ButtonProps from '@type/Button';

const Button = ({
  variant = 'primary',
  size = 'medium',
  block = false,
  align = 'center',
  ...props
}: ButtonProps) => {
  const baseStyles = 'focus:outline-hidden transition';

  const variantStyles = {
    primary: 'rounded-[5px] bg-pink text-white font-bold',
    secondary:
      'rounded-[5px] border border-bg-brown-tertiary text-brown-tertiary font-medium',
    submit: 'rounded-full bg-pink text-white font-semibold',
  };

  const sizeStyles = {
    small: 'w-[150px] h-[35px] text-[13px]',
    medium: 'w-[165px] h-[35px] text-[13px]',
    large: 'w-[180px] h-[46px] text-[18px]',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const blockStyles = {
    true: 'w-full',
    false: 'inline-block',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${blockStyles[block ? 'true' : 'false']} ${alignStyles[align]}`}
      {...props}
    />
  );
};

export default Button;
