import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { IMovie } from '../typings'
import {FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline';
interface Props {
    netflixOriginals: IMovie[]
}

function Banner({ netflixOriginals }: Props) {

    const [ movie, setMovie ] = useState<IMovie | null>(null);

    useEffect(() => {
        const index = Math.floor(Math.random() * (netflixOriginals?.length || 0));
        setMovie(netflixOriginals[index]);
        console.log('netflixOriginals', netflixOriginals[index]);
    }, [netflixOriginals])

    return (
        <div className='relative h-full w-full'>
            <div className='absolute top-0 left-0 -z-10 h-full w-full'>
                <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout="fill" objectFit='cover' />
            </div>
            <div className='absolute mt-[80px] flex flex-col left-[4%] z-10 w-[75%] md:w-[66%] lg:w-[40%] bottom-[30%] justify-end'>
                <h1 className='text-2xl md:text-4xl lg:text-7xl mb-6'>{movie?.title || movie?.name || movie?.original_name || movie?.original_title}</h1>
                <p className='text-[1.25rem] mb-6'>{movie?.overview}</p>
                <div className='flex'>
                    <button className='btn btn--icon btn--primary mr-4'>
                        <span className="btn__icon">
                            <FaPlay />
                        </span>
                        <span className='btn__text'>Play</span>
                    </button>
                    <button className='btn btn--icon btn--secondary'>
                        <span className="btn__icon">
                            <InformationCircleIcon />
                        </span>
                        <span className='btn__text'>More info</span>
                    </button>
                </div>
            </div>
            <div className='absolute right-0 bottom-[30%]'>
                {
                    !movie?.adult && <div className='h-[35px] w-[76px] border-l-white border-l-4 bg-[rgba(51,51,51,.6)] p-2 pl-3 text-left inline-flex items-center'>
                        A
                    </div>
                }
            </div>
        </div>
    )
}

export default Banner