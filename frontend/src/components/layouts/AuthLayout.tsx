import styled from '@emotion/styled';
import AppColor from '@styles/AppColor';
import Head from 'next/head';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function AuthLayout({ children, title = '', description }: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Container>{children}</Container>
      </div>
    </>
  );
}

const Container = styled.div`
  border: 1px solid ${AppColor.border.gray};
  border-radius: 20px;
  min-width: 300px;
  width: 40vw;
  min-height: 300px;
`;
