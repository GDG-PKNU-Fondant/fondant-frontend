import { ButtonHTMLAttributes } from 'react';

export default interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'submit';
  size?: 'small' | 'medium' | 'large';
}
