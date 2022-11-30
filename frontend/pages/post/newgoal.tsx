import TextInput from '@components/atoms/TextInput';
import CommonLayout from '@components/layouts/CommonLayout';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { NextPageWithLayout } from 'pages/_app';
import ButtonShort from '@components/atoms/ShortButton';
import LabelTextInput from '@components/molcules/LabelTextInput';
import Selector from '@components/atoms/Selector';
const Editor = dynamic(() => import('@components/post/Editor'), { ssr: false });

interface PostWriteProps {}

const PostWrite: NextPageWithLayout<PostWriteProps> = ({}) => {
  const { handleSubmit, values, errors, touched, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      html: '',
      distributionTokenAmount: '',
      certificationStartDate: '',
      certificationEndDate: '',
      certificationCycle: 1, // 1, 2, 3, 5, 7일
      certificationTime: 0, // 0 ~ 23시
    },
    validationSchema: Yup.object({
      title: Yup.string().max(50, '제목은 50자 이하로 입력해 주세요.').required('제목을 입력해 주세요.'),
      html: Yup.string().required('내용을 입력해 주세요.'),
    }),
    onSubmit: values => {},
  });

  return (
    <Container onSubmit={handleSubmit}>
      <TextInput
        name='title'
        placeholder='제목을 입력해 주세요.'
        containerStyle={{ borderRadius: '4px', height: '36px', borderColor: '#cccccc' }}
        error={Boolean(touched.title && errors.title)}
        helperText={errors.title}
        onChange={handleChange}
        value={values.title}
      />
      <Editor html={values.html} setHtml={(value: string) => setFieldValue('html', value)} placeholder='내용을 입력해 주세요.' />
      <div style={{ display: 'flex', width: '80%', flexDirection: 'column', rowGap: '10px' }}>
        <LabelTextInput label='배당 토큰 수량' name='distributionTokenAmount' placeholder='배당 토큰 수량을 입력해 주세요.' />
        <div style={{ display: 'flex', flex: 1, columnGap: '10px' }}>
          <Selector value={''} onChange={() => {}} />
        </div>
      </div>
      <ButtonShort label='작성' buttonStyle={{ width: '100px', height: '48px', fontSize: '16px' }} type='submit' />
    </Container>
  );
};

export default PostWrite;

PostWrite.getLayout = page => (
  <CommonLayout title='목표 달성 with Blockchain | 작성' description='달성하고자 하는 목표를 입력해 주세요.'>
    {page}
  </CommonLayout>
);

const Container = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  align-items: center;
`;
