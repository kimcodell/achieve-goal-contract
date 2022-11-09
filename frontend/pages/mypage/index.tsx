import CommonLayout from '@components/layouts/CommonLayout';
import { NextPageWithLayout } from 'pages/_app';

interface MyPageProps {}

const MyPage: NextPageWithLayout<MyPageProps> = ({}) => {
  return (
    <div>
      <h1>My Page</h1>
    </div>
  );
};

export default MyPage;

MyPage.getLayout = page => <CommonLayout title='목표 달성 with Blockchain'>{page}</CommonLayout>;
