import styled from '@emotion/styled';
import Head from 'next/head';
import { ReactElement } from 'react';
import ShortButton from '@components/atoms/ShortButton';
import Profile from '@components/atoms/Profile';

interface CommonLayoutProps {
  title: string;
  description: string;
  children: ReactElement;
}

export default function CommonLayout({ children, title, description }: CommonLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
      </Head>
      <main>
        <Header>
          <HeaderContainer>
            <div style={{ width: '120px', height: '32px', backgroundColor: 'skyblue' }} />
            <div style={{ display: 'flex', columnGap: '20px', alignItems: 'center' }}>
              <ShortButton label='로그인' />
              <Profile />
            </div>
          </HeaderContainer>
        </Header>
        <Main>{children}</Main>
      </main>
    </>
  );
}

const Header = styled.header`
  height: 72px;
  padding: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.main`
  max-width: 720px;
  min-height: calc(100vh - 72px);
  margin: 0 auto;
`;
