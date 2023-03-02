import Hero from '../components/Hero';
import Features from '../components/Features';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Social Blocks | Decentralized Social Links</title>
      </Helmet>

      <Hero />
      <Features />
    </>
  );
}
