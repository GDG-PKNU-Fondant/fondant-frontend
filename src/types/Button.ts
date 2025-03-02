import { ButtonHTMLAttributes } from 'react';

export default interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'submit';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  align?: 'left' | 'center' | 'right';
}
