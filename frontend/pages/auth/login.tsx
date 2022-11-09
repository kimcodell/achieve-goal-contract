import TextInput from '@components/atoms/TextInput';
import AuthLayout from '@components/layouts/AuthLayout';
import styled from '@emotion/styled';
import { NextPageWithLayout } from 'pages/_app';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ButtonShort from '@components/atoms/ShortButton';
import AppColor from '@styles/AppColor';
import { useRouter } from 'next/router';
import { login } from '@apis/authApi';
import { useMutation } from '@tanstack/react-query';

interface LoginProps {}

const Login: NextPageWithLayout<LoginProps> = ({}) => {
  const router = useRouter();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('올바른 형식의 이메일을 입력해 주세요.').required('이메일을 입력해 주세요.'),
      password: Yup.string().min(6, '6자리 이상 비밀번호를 입력해 주세요.').required('비밀번호를 입력해 주세요.'),
    }),
    onSubmit: values => _login(values),
  });

  const { mutate: _login } = useMutation(login, {
    onSuccess: () => router.push('/'),
  });

  return (
    <Container>
      <h1 style={{ fontSize: '28px', margin: '0 0 30px' }}>로그인</h1>
      <Form onSubmit={handleSubmit}>
        <TextInput
          name='email'
          placeholder='이메일'
          wrapperStyle={{ width: '100%', minWidth: '280px' }}
          error={Boolean(touched.email && errors.email)}
          helperText={errors.email}
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextInput
          name='password'
          placeholder='비밀번호'
          wrapperStyle={{ width: '100%', minWidth: '280px' }}
          type='password'
          error={Boolean(touched.password && errors.password)}
          helperText={errors.password}
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div style={{ width: '100%', minWidth: '280px', display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
          <ButtonShort label='로그인' buttonStyle={{ width: '100%', height: '44px', fontSize: '16px' }} />
          <ButtonShort
            label='회원가입'
            buttonStyle={{
              width: '100%',
              height: '48px',
              fontSize: '16px',
              color: AppColor.text.main,
              backgroundColor: AppColor.etc.white,
            }}
            onClick={e => {
              e.preventDefault();
              router.push('/auth/signup');
            }}
          />
        </div>
      </Form>
    </Container>
  );
};

export default Login;

Login.getLayout = page => <AuthLayout title='목표 달성 with Blockchain | 로그인'>{page}</AuthLayout>;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;
