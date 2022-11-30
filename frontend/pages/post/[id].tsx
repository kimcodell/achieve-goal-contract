import { getPostById, POST_QUERY_KEY } from '@apis/postApi';
import Loading from '@components/common/Loading';
import CommonLayout from '@components/layouts/CommonLayout';
import CertiPostComponent from '@components/post/CertiPostComponent';
import CommentComponent from '@components/post/CommentComponent';
import CommentInput from '@components/post/CommentInput';
import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import { formatDate, formatMoney } from '@utils/Utils';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useMe from '@hooks/useMe';

interface PostProps {}

const Post: NextPageWithLayout<PostProps> = ({}) => {
  const [openCertiPost, setOpenCertiPost] = useState<boolean>(true);

  const router = useRouter();

  const postId = useMemo(() => (typeof router.query.id === 'string' ? Number(router.query.id) : undefined), [router]);

  const { isLoggedIn } = useMe();

  const { data, isLoading } = useQuery(
    [POST_QUERY_KEY.GET_POST_BY_ID, postId],
    async () => {
      if (!postId) return null;
      if (postId === 0 || isNaN(postId)) {
        toast.error('잘못된 요청입니다.');
        router.push('/');
        return null;
      }
      return await getPostById({ postId });
    },
    {
      initialData: null,
    },
  );

  const formattedData = useMemo(
    () => ({
      createdAt: formatDate(data?.createdAt || ''),
      distributionTokenAmount: formatMoney(data?.distributionTokenAmount || ''),
      certificationStartDate: formatDate(data?.certificationStartDate || '', 'YYYY-MM-DD'),
      certificationEndDate: formatDate(data?.certificationEndDate || '', 'YYYY-MM-DD'),
    }),
    [data],
  );

  if (isLoading || !data) return <Loading />;
  return (
    <>
      <div>
        <Title>{data.title}</Title>
        <SubSectionContainer style={{ margin: '20px 0' }}>
          <TinyText style={{}}>{data.nickname}</TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{formattedData.distributionTokenAmount} TOKEN</TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{formattedData.createdAt}</TinyText>
        </SubSectionContainer>
        <SubSectionContainer>
          <TinyText>
            {formattedData.certificationStartDate} ~ {formattedData.certificationEndDate}
          </TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{data.certificationCycle}일 마다</TinyText>
          <span style={{ backgroundColor: AppColor.text.sub, opacity: 0.3, width: '1px', height: '10px' }} />
          <TinyText>{data.certificationTime}시 인증</TinyText>
        </SubSectionContainer>
      </div>

      <ContentContainer>{data.content}</ContentContainer>

      {data.certiPosts.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', columnGap: '10px' }}>
            <h2>인증 내역</h2>
            <CertiPostOpenButton style={{ fontSize: openCertiPost ? '18px' : '20px' }} onClick={() => setOpenCertiPost(prev => !prev)}>
              {openCertiPost ? '✕' : '▾'}
            </CertiPostOpenButton>
          </div>
          {openCertiPost && data.certiPosts.map(certi => <CertiPostComponent key={certi.id} data={certi} />)}
        </div>
      )}

      <div>
        {data.comments.length > 0 ? (
          <CommentHeader>댓글 {data.comments.length} 개</CommentHeader>
        ) : (
          <CommentHeader>아직 응원 댓글이 없습니다.</CommentHeader>
        )}
        {isLoggedIn && <CommentInput postId={data.postId} />}
        {data.comments.map(comment => (
          <CommentComponent key={comment.id} data={comment} />
        ))}
      </div>
    </>
  );
};

export default Post;

Post.getLayout = page => (
  <CommonLayout title='목표 달성 with Blockchain | 상세' description=''>
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

const SubSectionContainer = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-content: center;
`;

const TinyText = styled.p`
  font-size: 13px;
  color: ${AppColor.text.sub};
  font-weight: 300;
  margin: 0;
`;

const ContentContainer = styled.div`
  margin: 30px 0 20px;
  padding: 16px;
  font-size: 16px;
  color: ${AppColor.text.main};
  min-height: 600px;
  border-radius: 6px;
  border: solid 1px ${AppColor.border.gray};
`;

const CertiPostOpenButton = styled.button`
  border: none;
  background-color: transparent;
`;

const CommentHeader = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${AppColor.text.main};
  margin-bottom: 14px;
`;
