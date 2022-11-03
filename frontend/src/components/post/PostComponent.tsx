import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { formatDate, formatMoney } from '@utils/Utils';
import { PostSimpleDto } from '@_types/PostDto';
import Link from 'next/link';
import { useMemo } from 'react';

interface PostComponentProps {
  data: PostSimpleDto;
}

export default function PostComponent({ data }: PostComponentProps) {
  const formattedData = useMemo(
    () => ({
      createdAt: formatDate(data.createdAt),
      distributionTokenAmount: formatMoney(data.distributionTokenAmount),
    }),
    [data],
  );

  return (
    <Link href={`/post/${data.postId}`}>
      <Container>
        <Title>{data.title}</Title>
        <Text style={{ color: '#202020', fontWeight: 500, width: '10%' }}>{data.nickname}</Text>
        <Text style={{ width: '20%' }}>{formattedData.distributionTokenAmount} TOKEN</Text>
        <Text style={{ width: '20%' }}>{formattedData.createdAt}</Text>
      </Container>
    </Link>
  );
}

const Container = styled.tr`
  border-bottom: 1px solid ${AppColor.border.gray};
  padding: 14px 0;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.td`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: ${AppColor.text.main};
  width: 30%;
  padding: 16px 0;
  text-align: center;
`;

const Text = styled.td`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.8;
  color: ${AppColor.text.sub};
  padding: 16px 0;
  text-align: center;
`;
