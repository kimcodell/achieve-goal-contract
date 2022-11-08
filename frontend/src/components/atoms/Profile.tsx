import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import Image from 'next/image';
import UserIcon from '../../../assets/user_icon.png';

interface ProfileProps {
  profileImgUrl?: string;
  width?: string | number;
  height?: string | number;
}

export default function Profile({ profileImgUrl, width = '40px', height = '40px' }: ProfileProps) {
  return (
    <Container style={{ width, height }}>
      <Image
        src={profileImgUrl || UserIcon}
        layout={profileImgUrl ? 'responsive' : 'fixed'}
        width={profileImgUrl ? undefined : '30px'}
        height={profileImgUrl ? undefined : '30px'}
        objectFit={profileImgUrl ? 'cover' : 'contain'}
        alt='프로필 이미지'
      />
    </Container>
  );
}

const Container = styled.div`
  border-radius: 50%;
  background-color: ${AppColor.background.whitegray};
  border: 1px solid ${AppColor.border.gray};
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
