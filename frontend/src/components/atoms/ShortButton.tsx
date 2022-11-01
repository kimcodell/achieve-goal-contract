import styled from '@emotion/styled';
import { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';

interface ButtonShortProps {
  label?: string;
  buttonStyle?: CSSProperties;
}

export default function ButtonShort({label, buttonStyle, ...props} : ButtonShortProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return <Button style={buttonStyle} {...props}>{label}</Button>
}

const Button = styled.button`
  padding: 8px 16px;
  background-color: rgb(25, 118, 210);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  box-shadow: rgb(0, 0, 0, 0.2) 0px 3px 1px -2px, rgb(0, 0, 0, 0.14) 0px 2px 2px 0px, rgb(0, 0, 0, 0.12) 0px 1px 5px 0px;

  &:disabled {
    background-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.26);
  }
`