import styled from '@emotion/styled';

export default function Loading() {
  return <LoadingContainer>로딩 중...</LoadingContainer>;
}

const LoadingContainer = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
