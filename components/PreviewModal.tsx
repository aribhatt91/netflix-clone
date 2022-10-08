import { ScaleIcon } from '@heroicons/react/outline'
import { useState, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentCard, movieState, previewMode } from '../atoms/modal.atom'
import { IMovie } from '../typings'
import MovieFlatImage from './MovieFlatImage'
import { baseUrl } from '../constants/movie'

interface Props {
  movie?: IMovie
}

function PreviewModal() {
  const [movie, setMoview] = useRecoilState(movieState)
  const [card, setCard] = useRecoilState<any>(currentCard)
  const [preview, setPreviewMode] = useRecoilState(previewMode)
  const [ready, setReady] = useState(false)
  const values = useRef<any>(null)
  const modal = useRef(null);

  const calculatePosition = () => {
    /* Determine if the element is first or last */

    if(card){
      let { x, y, top, height, width, left, right } = card?.getBoundingClientRect();
      let absoluteTop = window.scrollY + top,
      firstPosition = x < width,
      lastPosition = x + 2*width > document?.body?.offsetWidth;

      //console.log('original values', card?.getBoundingClientRect());

      return {
        height,
        width,
        left: firstPosition ? x : (lastPosition ? (left - 0.5*width) : (left - 0.25*width)),
        top: (absoluteTop - 0.25*height),
        firstPosition,
        lastPosition
      }
    }
    return null;
    
  }

  const closePreview = () => {
    setTimeout(() => {
      setCard(null);
      setMoview(null);
      setPreviewMode(false);
    }, 500)
  }

  useEffect(() => {
    if(card){
      const result = calculatePosition();
      values.current = result;

      console.log('CalculatedResults', values.current);

      window.setTimeout(() => {
        setReady(true)
      }, 500)
      
    }
  }, [card])

  return (
    <>
{/*       <div className='preview--mini-modal__bg absolute top-0 left-0 w-full h-full '></div>
 */}      
      {values.current && <div id={movie?.id} className={`preview--mini-modal__dialog rounded ${values.current.firstPosition ? 'origin-left' : ''} ${values.current.lastPosition ? 'origin-right' : ''} overflow-hidden z-[49] absolute bg-[#141414] scale-[.6667] transition-all duration-150 `} ref={modal} style={{width: (Math.floor(values.current.width * 1.5) + 'px'), minHeight: (Math.floor(values.current.height * 1.5) + 'px'), top: (values.current.top + 'px'), left: (values.current.left + 'px')}} onMouseLeave={closePreview}>
        <MovieFlatImage className='preview--mini-modal__thumb' src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`} />
        <div className='preview--mini-modal__info-container hidden p-2 h-20'></div>
      </div>}
    </>
  )
}
/* ${values.current.firstPosition ? 'origin-top-left': 'origin-top'} ${values.current.lastPosition ? 'origin-top-right': ''} */
export default PreviewModal;