import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { formatDate } from '@utils/Utils';
import Image from 'next/image';
import { useMemo } from 'react';

interface CertiPostComponentProps {
  data: {
    id: number;
    comment: string;
    imageUrl: string;
    createdAt: string;
  };
}

export default function CertiPostComponent({ data }: CertiPostComponentProps) {
  const createdAt = useMemo(() => formatDate(data.createdAt), [data]);
  return (
    <Container>
      <div
        style={{
          display: 'block',
          border: '1px solid black',
          width: '50%',
          maxHeight: '100%',
        }}>
        <Image src={data.imageUrl} width='40px' height='40px' layout='responsive' alt='인증 게시물 이미지' />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', padding: '10px 20px' }}>
        <Text>{data.comment}</Text>
        <Text style={{ justifySelf: 'flex-end', color: AppColor.text.sub, fontSize: '12px' }}>{createdAt}</Text>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100px;
  border: 1px solid ${AppColor.border.gray};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
`;

const Text = styled.p``;
