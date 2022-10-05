interface Props {
    className?: string
    ref?: any
}
const Card = (props: Props) => {
    return (
        <div className={`${props.className || ""}`}>
            <div className={`card`}>
                <div className="relative w-full pb-0 pt-[56.25%] rounded cursor-pointer"></div>
            </div>
        </div>
    )
}

function SkeletonRow(props: Props) {
  return (
    <div className="overflow-hidden mt-10">
        <div className="flex items-center mb-6 cursor-pointer">
            <div className="h-[28px] md:h-[32px] ml-[4%] w-[250px] rounded bg-[rgb(34,34,34)] inline-block"></div>
        </div>
        <div>
            <div className={'pr-[4%] pl-[4%] w-full relative flex overflow-hidden flex-nowrap'}>
                {
                    ([1,2,3,4,5,6]).map((m) => <Card key={m} className='min-w-[33.33%] md:min-w-0 md:w-1/6' />)
                }
            </div>
        </div>
    </div>
  )
}

export default SkeletonRow