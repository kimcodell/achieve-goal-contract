import styled from "@emotion/styled";
import { formatDate, formatMoney } from "@utils/Utils";
import { PostSimpleDto } from "@_types/PostDto";
import Link from "next/link";
import { useMemo } from "react";

interface PostComponentProps {
  data: PostSimpleDto;
}

export default function PostComponent({data}: PostComponentProps) {
  const formattedData = useMemo(() => ({
    createdAt: formatDate(data.createdAt),
    distributionTokenAmount: formatMoney(data.distributionTokenAmount),
  }), [data]);

  return (
    <Link href={`/post/${data.postId}`}>
        <Container>
          <Title>{data.title}</Title>
          <Text style={{color: '#202020', fontWeight: 500, width: '10%'}}>{data.nickname}</Text>
          <Text style={{width: '20%'}}>{formattedData.distributionTokenAmount} TOKEN</Text>
          <Text style={{width: '20%'}}>{formattedData.createdAt}</Text>
        </Container>
    </Link>
  );
}

const Container = styled.tr`
  border-bottom: 1px solid #C4C4C4;
  padding: 14px 0;
  
  &:hover{
    cursor: pointer;
  }
`

const Title = styled.td`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  color: #202020;
  width: 30%;
  padding: 16px 0;
  text-align: center;
`

const Text = styled.td`
  font-size: 14px;
  font-weight: 300;
  line-height: 1.8;
  color: #8D939D;
  padding: 16px 0;
  text-align: center;
`