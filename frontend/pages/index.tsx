import Head from "next/head";
import CommonLayout from "@components/layouts/CommonLayout";
import styles from "@styles/Home.module.css";
import { NextPageWithLayout } from "./_app";
import PostComponent from "@components/post/PostComponent";
import styled from "@emotion/styled";

interface Props {
}

const data = [
  {
    postId: 1,
    userId: 1,
    title: "제목1",
    distributionTokenAmount: "100000",
    status: 1,
    createdAt: "2022-07-15T06:45:09.000Z",
    nickname: "유저1",
  },
  {
    postId: 2,
    userId: 1,
    title: "제목2",
    distributionTokenAmount: "100000",
    status: 1,
    createdAt: "2022-07-16T06:45:09.000Z",
    nickname: "유저1",
  },
  {
    postId: 3,
    userId: 2,
    title: "제목3",
    distributionTokenAmount: "300000",
    status: 1,
    createdAt: "2022-07-16T16:45:09.000Z",
    nickname: "유저2",
  },
]

const Home: NextPageWithLayout<Props> = ({}: Props) => {
  return (
    <>
      <h1>게시글 목록</h1>
      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{margin: '10px 0'}}>
            <Th>제목</Th>
            <Th>작성자</Th>
            <Th>배당 토큰 수량</Th>
            <Th>작성일</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((post) => (
            <PostComponent key={post.postId} data={post} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;

Home.getLayout = (page) => <CommonLayout title="목표 달성 서비스 with Blockchain | 홈" description="">{page}</CommonLayout>


const Th = styled.th`
  color: #202020;
  font-size: 16px;
`
// export async function getServerSideProps() {
//   const { results } = await (await fetch("/api/movies")).json();
//   return {
//     props: {
//       results,
//     },
//   };
// }
