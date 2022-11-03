import styled from '@emotion/styled';
import Image from 'next/image';

interface ProfileProps {
  profileImgUrl?: string;
  width?: string | number;
  height?: string | number;
}

export default function Profile({ profileImgUrl, width, height }: ProfileProps) {
  return (
    <Container style={{ ...(width ? { width } : null), ...(height ? { height } : null) }}>
      {/* <Image src={profileImgUrl || ''}  /> */}
    </Container>
  );
}

const Container = styled.div`
  border-radius: 1000px;
  background-color: #f5f5f5;
  border: 1px solid #c4c4c4;
  width: 40px;
  height: 40px;
`;
