import { IMovie } from "../typings"
import Slider, { Settings } from "react-slick"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useState, useEffect } from 'react'
import MovieCard from "./MovieCard"

interface RowProps {
    title: string,
    movies: IMovie[]
}

const PrevArrow = (props: any) => {
    const { className, style, onClick, currentSlide } = props;
    const [ dirty, setDirty ] = useState(false);

    useEffect(() => {
      console.log('PrevArrow', currentSlide);
      if(currentSlide > 0 && !dirty) {
        setDirty(true)
      }
    }, [currentSlide])
    
    return (
        <div onClick={onClick} className={`${className} ${dirty ? '' : 'invisible'} transform-none cursor-pointer absolute lg:flex justify-center items-center text-white left-0 top-0 h-full w-[4%] bg-[rgba(0,0,0,.5)]  hover:text-white hover:bg-[rgba(0,0,0,.75)]`} >
            <ChevronLeftIcon className="h-9 w-9 hover:scale-125 transition-all duration-150" />
        </div>
    )
}
const NextArrow = (props: any) => {
    const { className, style, onClick, currentSlide } = props;

    return (
        <div onClick={onClick} className={`${className} transform-none cursor-pointer absolute lg:flex justify-center items-center text-white right-0 top-0 h-full w-[4%] bg-[rgba(0,0,0,.5)]  hover:text-white hover:bg-[rgba(0,0,0,.75)]`} >
            <ChevronRightIcon className="h-9 w-9 hover:scale-125 transition-all duration-150" />
        </div>
    )
}


const settings: Settings = {
    dots: true,
    lazyLoad: 'anticipated',
    infinite: true,
    centerMode: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 4
        }
      },
      {
        breakpoint: 480,
        settings: {
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 3
        }
      }
    ]
}


function Row({title, movies}: RowProps) {

    return (
        <div className="overflow-hidden movie-cards-wrapper mt-10">
            <div className="flex items-center mb-6 movie-cards-heading cursor-pointer">
                <h2 className="text-xl md:text-xl lg:text-2xl font-semibold m-0 pl-[4%] w-auto inline-block">{title}</h2>
                <div className="inline-flex items-center text-l font-bold text-[#54b9c5] ml-0">
                    <span className="see-all-link">Explore All</span>
                    <span className="see-all-arrow inline-flex items-center opacity-0"><ChevronRightIcon className="h-6 font-bold"/></span>
                </div>
            </div>
            <div>
                <Slider {...settings} className={'pr-[4%] pl-[4%] relative movie-cards'}>
                    {
                        (movies || []).map((m) => <MovieCard movie={m} key={m.id} />)
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Row