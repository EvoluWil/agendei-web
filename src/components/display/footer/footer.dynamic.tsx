import dynamic from 'next/dynamic';

export const FooterDynamic = dynamic(() => import('./footer.component'), {
  ssr: false
});
