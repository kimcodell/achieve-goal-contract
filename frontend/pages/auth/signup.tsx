import ButtonShort from '@components/atoms/ShortButton';
import TextInput from '@components/atoms/TextInput';
import AuthLayout from '@components/layouts/AuthLayout';
import AppColor from '@styles/AppColor';
import { NextPageWithLayout } from 'pages/_app';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { signup } from '@apis/authApi';
import { useMutation } from '@tanstack/react-query';

interface SignUpProps {}

const SignUp: NextPageWithLayout<SignUpProps> = ({}: SignUpProps) => {
  const router = useRouter();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      rePassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('이름을 입력해 주세요.'),
      nickname: Yup.string().required('닉네임을 입력해 주세요.'),
      email: Yup.string().email('올바른 형식의 이메일을 입력해 주세요.').required('이메일을 입력해 주세요.'),
      password: Yup.string().min(6, '6자리 이상 비밀번호를 입력해 주세요.').required('비밀번호를 입력해 주세요.'),
      rePassword: Yup.string().required('비밀번호를 한번 더 입력해 주세요.'),
    }),
    validate: values => {
      const error: { rePassword?: string } = {};
      if (values.password && values.rePassword) {
        if (values.password !== values.rePassword) {
          error.rePassword = '비밀번호가 일치하지 않습니다.';
        }
      }
      return error;
    },
    onSubmit: values => {
      const params = {
        name: values.name,
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        registerType: 1,
      };
      console.log(params);
      _signup(params);
    },
  });

  const { mutate: _signup } = useMutation(signup);

  return (
    <Container>
      <h1 style={{ fontSize: '28px', margin: '0 0 30px' }}>회원가입</h1>
      <Form onSubmit={handleSubmit}>
        <TextInput
          name='name'
          placeholder='이름'
          wrapperStyle={{ width: '100%', minWidth: '280px' }}
          error={Boolean(touched.name && errors.name)}
          helperText={errors.name}
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <TextInput
          name='nickname'
          placeholder='닉네임'
          wrapperStyle={{ width: '100%', minWidth: '280px' }}
          error={Boolean(touched.nickname && errors.nickname)}
          helperText={errors.nickname}
          value={values.nickname}
          onBlur={handleBlur}
          onChange={handleChange}
        />
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
        <TextInput
          name='rePassword'
          placeholder='비밀번호 확인'
          wrapperStyle={{ width: '100%', minWidth: '280px' }}
          type='password'
          error={Boolean(touched.rePassword && errors.rePassword)}
          helperText={errors.rePassword}
          value={values.rePassword}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <ButtonShort
          label='회원가입'
          buttonStyle={{
            marginTop: '10px',
            width: '100%',
            minWidth: '280px',
            height: '48px',
            fontSize: '16px',
          }}
        />
      </Form>
    </Container>
  );
};

export default SignUp;

SignUp.getLayout = page => <AuthLayout title='목표 달성 with Blockchain | 회원가입'>{page}</AuthLayout>;

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
