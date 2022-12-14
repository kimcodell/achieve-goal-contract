import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useMemo } from 'react';
import wrapper from '@store/configStore';
import '@styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//참고: https://nextjs.org/docs/basic-features/layouts#with-typescript
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? (page => page);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position='bottom-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </>
  );
}

export default wrapper.withRedux(App);
