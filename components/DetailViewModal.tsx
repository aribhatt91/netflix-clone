import { DocumentData } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, movieState } from '../atoms/modal.atom'
import { IMovie } from '../typings';
import MovieFlatImage from './MovieFlatImage';
import { baseUrl } from '../constants/movie'
import { XIcon } from '@heroicons/react/outline';
import ReactPlayer from 'react-player';

interface Props {
    children: React.ReactElement | React.ReactNode
}

function DetailViewModal() {
    const [ showModal, setShowModal ] = useRecoilState(modalState);
    const [ movie, setMovie ] = useRecoilState(movieState);
    const [data, setData] = useState<any>(null);

    const genres = data?.genres || [],
    creators = data?.created_by || [],
    season_count = data?.number_of_seasons || 0,
    episode_count = data?.number_of_episodes || 0,
    countries = data?.origin_country  || [],
    rating = data?.vote_average || null,
    runtime = data?.runtime || null,
    release_date = data?.release_date || null,
    videos = data?.videos?.results || [],
    trailer = videos?.find((v: any) => v?.name === 'Official Trailer' || v?.name?.indexOf('Trailer') > -1) || null;

    const close = () => {
        document.body.style.removeProperty('overflow')
        document.body.style.removeProperty('max-height')
        setMovie(null)
        setShowModal(false)
    }

    useEffect(() => {
        if(!movie || (data && data.id === movie.id)){
            return
        }
        document.body.style.maxHeight = '100vh';
        document.body.style.overflow = 'hidden';

        const fetchMovie = async (movie: IMovie | DocumentData) => {
            const data = await fetch(`https://api.themoviedb.org/3/${
                    movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${
                    process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then(response => response.json())
            .catch(error => console.error(error))

            console.log('fetchMovie', movie, data);

            setData(data || null);

        }

        fetchMovie(movie);
    }, [movie])

    return (
        <>
            <div className={`app-modal fixed top-0 left-0 w-screen h-screen overflow-y-auto overflow-x-hidden z-[9999] flex justify-center items-start ${movie ? '' : 'hidden'}`}>
                <div className='bg-[rgba(0,0,0,.7)] fixed top-0 left-0 w-full h-full' onClick={close}></div>
                <div className='app-modal__body relative w-full h-full lg:w-[850px] lg:h-auto bg-[#141414] overflow-hidden rounded lg:mb-6 lg:mt-6'>
                    <div className='app-modal__video relative'>
                        <MovieFlatImage src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title || movie?.name} />
                        {
                        trailer && trailer.key && 
                            <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${trailer.key}`}
                            width={'100%'}
                            height={'100%'}
                            playing
                            style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0}} />
                        }
                    </div>
                    <div className='app-modal__detail flex flex-col w-full p-6 lg:p-12'>
                        <div className='flex flex-wrap flex-col lg:flex-nowrap lg:flex-row lg:justify-between'>
                            <div className='app-modal__metadata-left w-full lg:w-[60%]'>
                                <h6 className='font-semibold mb-2'>{movie?.name || movie?.title}</h6>
                                <p>{movie?.overview || ""}</p>
                            </div>
                            <div className='app-modal__metadata-right mt-4 lg:mt-0 w-full lg:w-[35%]'>
                                {season_count !== 0 && <p className='mb-2 text-[0.875rem]'><span className='text-[#777]'>Number of seasons:</span><span >{season_count}</span></p>}
                                {episode_count !== 0 && <p className='mb-2 text-[0.875rem]'><span className='text-[#777]'>Number of seasons:</span><span>{episode_count}</span></p>}
                                {genres && Array.isArray(genres) && genres.length && <p className='mb-2 text-[0.875rem]'><span className='text-[#777]'>Genres: </span>
                                    <span>{
                                        genres.map(g => g.name || "").join(', ')
                                    }</span>
                                </p>}
                                {rating && <p className='mb-2 text-[0.875rem]'><span className='text-[#777]'>This movie is rated: </span><span>{Number(rating).toFixed(1)}</span></p>}
                            </div>
                        </div>
                        {/* TV Series */
                            movie?.media_type === 'tv' && <div className="app-modal__episodes mt-6">
                                <h3 className='text-[26px] lg:text-[32px] font-semibold'>Episodes</h3>
                            </div>
                        }
                        <div className="app-modal__trailers mt-6">
                            <h3 className='text-[26px] lg:text-[32px] font-semibold'>Trailers & More</h3>
                            
                        </div>
                        <div className="app-modal__about mt-6">
                            <h3 className='text-[26px] lg:text-[32px] font-semibold'>About {movie?.name || movie?.title}</h3>
                            
                        </div>
                        
                    </div>
                    <span className='w-[32px] h-[32px] lg:w-[36px] lg:h-[36px] inline-flex items-center justify-center p-1 rounded-[50%] cursor-pointer bg-[#181818] absolute top-4 right-4' onClick={close}>
                        <XIcon />
                    </span>
                </div>
            </div>
        </>
    )
}

export default DetailViewModal