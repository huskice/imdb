import Head from 'next/head'

import { dehydrate, QueryClient } from '@tanstack/react-query'

import { getMovies } from '../ssp/getMovies'

import BasicTable from '../components/BasicTable'

const Home = () => {
  return (
    <>
      <div>
        <Head>
          <title>IMDB website</title>
        </Head>
      </div>
      <div>
        <BasicTable />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['movies'], getMovies)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
