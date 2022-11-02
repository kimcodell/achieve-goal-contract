import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import wrapper from "@store/configStore";
import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

//참고: https://nextjs.org/docs/basic-features/layouts#with-typescript
export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout<any>;
}

function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
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
    </>
  );
}

export default wrapper.withRedux(App);
