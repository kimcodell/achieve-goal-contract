import styled from '@emotion/styled';
import Head from 'next/head';
import { ReactElement, useCallback } from 'react';
import ShortButton from '@components/atoms/ShortButton';
import Profile from '@components/atoms/Profile';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useMe from '@hooks/useMe';
import Logo from '@components/common/Logo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@apis/authApi';
import { USER_QUERY_KEY } from '@apis/userApi';

interface CommonLayoutProps {
  title?: string;
  description?: string;
  children: ReactElement;
}

export default function CommonLayout({ children, title = '', description }: CommonLayoutProps) {
  const { me, isLoggedIn } = useMe();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: _logout } = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries([USER_QUERY_KEY.GET_MY_INFO]);
      router.reload();
    },
  });

  const onLogout = useCallback(() => {
    _logout();
  }, [_logout]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
      </Head>
      <main style={{ marginBottom: '32px' }}>
        <Header>
          <HeaderContainer>
            <Link href='/' passHref>
              <a>
                <Logo />
              </a>
            </Link>
            <div style={{ display: 'flex', columnGap: '20px', alignItems: 'center' }}>
              {isLoggedIn ? (
                <>
                  <Link href='/mypage' passHref>
                    <a>
                      <Profile />
                    </a>
                  </Link>
                  <p>{me?.nickname} 님</p>
                  <ShortButton label='로그아웃' onClick={onLogout} />
                </>
              ) : (
                <ShortButton label='로그인' onClick={() => router.push('/auth/login')} />
              )}
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
