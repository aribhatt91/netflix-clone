import Image from 'next/image'

interface Props {
    className?: string
    src: string
    alt?: string
    onClick?: any
}

function MovieFlatImage({className, src, alt}: Props) {
  return (
    <div className={`${className || ""} relative w-full pb-0 pt-[142%] md:pt-[56.25%] rounded overflow-hidden`}>
        <Image src={src} className="w-full h-full absolute top-0 left-0" objectFit='cover' layout="fill" alt={alt || ""}/>
    </div>
  )
}

export default MovieFlatImage