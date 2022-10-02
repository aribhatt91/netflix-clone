import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie';
import { IMovie } from '../typings'

interface Props {
    netflixOriginals: IMovie[]
}

function Banner({ netflixOriginals }: Props) {

    const [ movie, setMovie ] = useState<IMovie | null>(null);

    useEffect(() => {
        const index = Math.floor(Math.random() * (netflixOriginals?.length || 0));
        setMovie(netflixOriginals[index]);
    }, [netflixOriginals])

    return (
        <div>
            <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
                <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} layout="fill" objectFit='cover' />
            </div>
        </div>
    )
}

export default Banner