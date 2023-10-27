import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Loading from '@/components/loading';

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setIsLoading(true);
      }
    };

    const handleComplete = (url: string) => {
      setIsLoading(false);
    };

    const handleError = (error: any) => {
      setIsLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  return (
  <div>
    <Head>
      <title>Billplz Analytics</title>
      <meta
          name="description"
          content="Billplz - Billplz Analytics"
        />
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1.0" 
      />
    </Head>
      {isLoading ? 
      <Loading/>: 
      <Component {...pageProps} />
      }
  </div>
  )
}
