import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';

export default function Loading() {
  return (
    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingContainer>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingContainer>
    </div>
  );
}

const LoadingRingKeyFrame = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 70px;
  height: 70px;

  & {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 6px solid ${AppColor.text.main};
    border-radius: 50%;
    animation: ${LoadingRingKeyFrame} 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${AppColor.text.main} transparent transparent transparent;
  }

  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;
