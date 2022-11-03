import CommonLayout from '@components/layouts/CommonLayout';
import { NextPageWithLayout } from './_app';
import PostComponent from '@components/post/PostComponent';
import styled from '@emotion/styled';
import { PostSimpleDto } from '@_types/PostDto';
import { getAllPosts } from '@apis/postApi';

interface HomeProps {
  data: PostSimpleDto[];
}

export async function getServerSideProps() {
  const data = await getAllPosts();
  return {
    props: {
      data,
    },
  };
}

const Home: NextPageWithLayout<HomeProps> = ({ data = [] }: HomeProps) => {
  return (
    <>
      <h1>게시글 목록</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ margin: '10px 0' }}>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>배당 토큰 수량</Th>
            <Th>작성일</Th>
          </tr>
        </thead>
        <tbody>
          {data.map(post => (
            <PostComponent key={post.postId} data={post} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;

Home.getLayout = page => (
  <CommonLayout title='목표 달성 서비스 with Blockchain | 홈' description=''>
    {page}
  </CommonLayout>
);

const Th = styled.th`
  color: #202020;
  font-size: 16px;
`;
