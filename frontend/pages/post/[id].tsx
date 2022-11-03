import { getPostById } from '@apis/postApi';
import Loading from '@components/common/Loading';
import CommonLayout from '@components/layouts/CommonLayout';
import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { formatDate, formatMoney } from '@utils/Utils';
import { PostDto } from '@_types/PostDto';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

interface PostProps {}

const Post: NextPageWithLayout<PostProps> = ({}: PostProps) => {
  const [data, setData] = useState<PostDto | null>(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.id === undefined) return;
      const postId = Number(router.query.id);
      if (postId === 0 || isNaN(postId)) {
        toast.error('잘못된 요청입니다.');
        router.push('/');
        return;
      }
      const data = await getPostById({ postId });
      setData(data);
    })();
  }, [router]);

  const formattedData = useMemo(
    () => ({
      createdAt: formatDate(data?.createdAt || ''),
      distributionTokenAmount: formatMoney(data?.distributionTokenAmount || ''),
    }),
    [data],
  );

  if (!data) return <Loading />;
  return (
    <>
      <div>
        <Title>{data.title}</Title>
        <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center', justifyContent: 'center' }}>
          <TinyText style={{}}>{data.nickname}</TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{formattedData.distributionTokenAmount} TOKEN</TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{formattedData.createdAt}</TinyText>
        </div>
      </div>

      <ContentContainer>{data.content}</ContentContainer>
    </>
  );
};

export default Post;

Post.getLayout = page => (
  <CommonLayout title='목표 달성 서비스 with Blockchain | 상세' description=''>
    {page}
  </CommonLayout>
);

const Title = styled.h1`
  text-align: center;
  fontsize: 20px;
  margin: 40px 0 4px;
  color: ${AppColor.text.main};
  font-weight: 600;
`;

const TinyText = styled.p`
  font-size: 13px;
  color: ${AppColor.text.sub};
  font-weight: 300;
`;

const ContentContainer = styled.div`
  margin-top: 30px;
  padding: 10px;
  font-size: 16px;
  color: ${AppColor.text.main};
`;
