import TextInput, { TextInputProps } from '@components/atoms/TextInput';
import { CSSProperties, DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface LabelTextInputProps {
  label: string;
  containerStyle?: CSSProperties;
}

export default function LabelTextInput({
  label,
  containerStyle,
  ...rest
}: LabelTextInputProps & TextInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <div style={containerStyle}>
      <p>{label}</p>
      <TextInput {...rest} />
    </div>
  );
}
