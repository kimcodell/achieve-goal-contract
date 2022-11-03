import { getPostById } from '@apis/postApi';
import Loading from '@components/common/Loading';
import CommonLayout from '@components/layouts/CommonLayout';
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
      <>
        <h1>{data.title}</h1>
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <p>
            {data.nickname}
            <span style={{ backgroundColor: '#ebebeb', width: '1px', height: '9px' }} />
            {formattedData.createdAt}
          </p>
        </div>
      </>
    </>
  );
};

export default Post;

Post.getLayout = page => (
  <CommonLayout title='목표 달성 서비스 with Blockchain | 상세' description=''>
    {page}
  </CommonLayout>
);
