import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../styles/Layouts';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>AXUI-DATAGRID</title>
        <meta name="description" content="Index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <ul>
          <li>
            <Link href={'/Basic'}>Basic</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Home;
