import CommonLayout from '@components/layouts/CommonLayout';
import { NextPageWithLayout } from './_app';
import PostComponent from '@components/post/PostComponent';
import styled from '@emotion/styled';
import { PostSimpleDto } from '@_types/PostDto';
import { getAllPosts } from '@apis/postApi';
import AppColor from '@styles/AppColor';
import ButtonShort from '@components/atoms/ShortButton';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>게시글 목록</h1>
        <ButtonShort label='글쓰기' onClick={() => router.push('/post/newgoal')} buttonStyle={{ fontSize: '16px', height: '40px' }} />
      </div>
      <div style={{ border: `1px solid ${AppColor.border.gray}`, borderRadius: '20px', padding: '40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
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
      </div>
    </>
  );
};

export default Home;

Home.getLayout = page => <CommonLayout title='목표 달성 with Blockchain | 홈'>{page}</CommonLayout>;

const Th = styled.th`
  color: ${AppColor.text.main};
  font-size: 18px;
  padding-bottom: 10px;
`;
