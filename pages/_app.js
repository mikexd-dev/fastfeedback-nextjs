import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AuthProvider } from '@/lib/auth';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default MyApp;
