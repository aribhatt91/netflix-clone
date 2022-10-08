import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import SkeletonRow from '../components/SkeletonRow'
import { IMovie } from '../typings'
import requests from '../utils/requests'
import { useState, useRef, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { modalState, previewMode } from '../atoms/modal.atom'
import DetailViewModal from '../components/DetailViewModal'
import PreviewModal from '../components/PreviewModal'

interface Props {
  netflixOriginals: IMovie[],
  trendingNow: IMovie[],
  topRated: IMovie[],
  actionMovies: IMovie[],
  comedyMovies: IMovie[],
  horrorMovies: IMovie[],
  romanceMovies: IMovie[],
  documentaries: IMovie[],
}

const Home = ({netflixOriginals, trendingNow, topRated}: Props) => {
  const showDetailView = useRecoilValue(modalState);
  const showPreview = useRecoilValue(previewMode)
  const skeletonRef1 = useRef<any>(null);

  useEffect(() => {
    /* Add intersection observers */
  }, [skeletonRef1])

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/5 to-[#010511] lg:h-[57vw]">
      <Head>
        <title>Netflix Clone</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      {/* header */}
      <Header />
      <main>
        <section className='billboard relative w-full h-[100vh] md:h-[57vw]'>
          <Banner netflixOriginals={netflixOriginals} />
          <div className='absolute bottom-0 w-full left-0'>
            <Row title='Popular on Netflix' movies={netflixOriginals} />
          </div>
        </section>
        {/* Banner */}
        <section>
          <Row title='Trending now' movies={trendingNow} />
          <Row title='Top rated' movies={topRated} />
          <div className='w-full' ref={skeletonRef1}>
            <SkeletonRow />
            <SkeletonRow />
          </div>
          
          {/* Row */}
          {/* Row */}
          {/* Row */}
          {/* Row */}
          {/* Row */}
        </section>
      </main>

      {/* modal */
        showDetailView && <DetailViewModal />
      }

      {
        showPreview && <PreviewModal />
      }

      <footer className="flex h-24 w-full items-center justify-center bg-black">
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results/* ,
      products, */
    },
  }
}
