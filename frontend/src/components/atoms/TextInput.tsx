import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { CSSProperties, DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

export interface TextInputProps {
  wrapperStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  endAdornment?: ReactElement;
  error?: boolean;
  helperText?: string;
}

export default function TextInput({
  wrapperStyle,
  containerStyle,
  error,
  helperText,
  endAdornment,
  ...rest
}: TextInputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <Wrapper style={wrapperStyle}>
      <Container style={containerStyle}>
        <Input {...rest} />
      </Container>
      {error && helperText && <ErrorText>{helperText}</ErrorText>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: ${AppColor.etc.white};
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  border: 2px solid ${AppColor.border.black};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: ${AppColor.etc.white};
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  flex: 1;
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: ${AppColor.text.error};
  font-size: 12px;
  line-height: 1.5;
  margin: 8px 0 2px;
  position: absolute;
`;
