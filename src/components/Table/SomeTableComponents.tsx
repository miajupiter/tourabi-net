import Image from 'next/image'
export const TdTitleAndImage = ({ title, images }: { title?: string, images?: [] }) => {
  return <>
    <h5 className="ms-2 font-medium text-black dark:text-slate-100">
      {title}
    </h5>
    {images && <div className='flex justify-start mt-2'>
      {images.map((imgObj: any, index: number) => <>
        {index < 3 && (imgObj.thumbnail || imgObj.image) &&
          <div key={index} className='h-18 max-w-26 mx-1'>
            <Image className='aspect-square rounded' src={imgObj.thumbnail || imgObj.image} alt="alt" width={72} height={72} />
          </div>
        }
      </>)}
    </div>}
  </>
}

export const TdActivePassive = ({ passive }: { passive?: boolean }) => {
  return <>
    {passive && <span className='text-[#999]'>PASSIVE</span>}
    {!passive && <span className='text-primary font-medium'>ACTIVE</span>}
  </>
}

