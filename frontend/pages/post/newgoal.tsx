import CommonLayout from '@components/layouts/CommonLayout';
import { NextPageWithLayout } from 'pages/_app';

interface PostWriteProps {}

const PostWrite: NextPageWithLayout<PostWriteProps> = ({}: PostWriteProps) => {
  return <div>글 작성 페이지</div>;
};

export default PostWrite;

PostWrite.getLayout = page => (
  <CommonLayout title='목표 달성 with Blockchain | 작성' description='달성하고자 하는 목표를 입력해주세요.'>
    {page}
  </CommonLayout>
);
