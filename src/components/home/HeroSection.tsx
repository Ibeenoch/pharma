import CustomText from "../common/Text"

const HeroSection = () => {
  return (
    <section className="grid grid-cols-2">
        <article>
            <div className="flex gap-2 items-center my-8">
                <div className="bg-black rounded-sm w-8 h-8"></div>
                <div className="flex flex-col gap-1">
                    <CustomText text="Medik Report" textType="small" weightType="bold" />
                    <CustomText text="Rated Best 12.5k Reviews" textType="extrasmall" weightType="normal" color="gray" />
                </div>
            </div>

            <div className="">
                <CustomText text="Emirates Benefits by Visa Infinite" textType="superhuge" weightType="medium" />
            </div>
        </article>

    </section>
  )
}

export default HeroSection