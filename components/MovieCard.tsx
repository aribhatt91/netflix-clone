import { IMovie } from "../typings"
import {useRef} from 'react'
import { useRecoilState } from "recoil"
import { currentCard, modalState, movieState, previewMode } from "../atoms/modal.atom"
import { baseUrl } from '../constants/movie'
import MovieFlatImage from "./MovieFlatImage"
import {debounce} from 'lodash'

interface MovieCardProps {
    movie: IMovie
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

function MovieCard({movie}: MovieCardProps) {
    const el = useRef(null)
    const [ cmovie, setMovie ] = useRecoilState(movieState);
    const [ preview, setPreview ] = useRecoilState(previewMode);
    const [ detailView, setDetailView ] = useRecoilState(modalState);
    const [ selectedCard, setSelectedCard ] = useRecoilState(currentCard);

    const onClick = () => {
        if(cmovie){
            return;
        }
        if(el.current) {
            setSelectedCard(el.current)
            setMovie(movie);
            //setDetailView(true);
            setPreview(true);
        }
    }

    return (
        <div className="card relative" ref={el} onClick={debounce(onClick, 300)}>
            <MovieFlatImage className="rounded cursor-pointer" src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} alt={movie.title || movie.name} />
            {/* {
                selectedCard === el.current && cmovie && cmovie.id === movie.id && <PreviewModal movie={movie} />
            } */}
        </div>
    )
}

export default MovieCard