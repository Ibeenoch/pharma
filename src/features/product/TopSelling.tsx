import ts2 from '../../assets/images/ts2_chivita.png';
import ts3 from '../../assets/images/ts3_peakmilk.png';
import ts4 from '../../assets/images/ts4_milo.png';
import ts5 from '../../assets/images/ts5_spaghetti.png';
import ts6 from '../../assets/images/ts6_closeup.png';
import ts7 from '../../assets/images/ts7_dettol.png';
import ts8 from '../../assets/images/ts8_nivea.png';
import CustomText from '../../components/common/Text';
import TwoTextSpan from '../../components/home/TwoTextSpan';

const TopSelling = () => {
    const topSellingImage = [ts2, ts3, ts4, ts5, ts6, ts7, ts8];
    const topSelling = [
        {name: "Chivita 100% Fruit Juice", price: 1200, oldprice:1500},
        {name: "Peak Milk", price: 1000, oldprice: 1450},
        {name: "Milo Chocolate Drink", price: 2500, oldprice: 3200},
        {name: "Golden Penny Pasta", price: 1100, oldprice: 1300},
        {name: "Close-Up Toothpaste", price: 900, oldprice: 1100},
        {name: "Dettol Antiseptic", price: 1800, oldprice: 2200},
        {name: "Nivea Body Lotion", price: 1650, oldprice: 1900},
    ];

  return (
    <section className="border-b border-black mb-2 pb-4">
    <TwoTextSpan leftText="Top Selling" />

    <article className="flex gap-4 overflow-x-auto">
      {topSellingImage.map((item, index) => (
        <div className="cursor-pointer" key={index}>
           <div className="h-22 w-20 md:h-30 md:w-28 lg:h-38 lg:w-32 xl:h-48 xl:w-42 flex items-center justify-center rounded-xl p-2 bg-white mb-4">
            <img
              src={item}
              alt="medication categories"
              className="w-46 h-auto object-fill"
            />
          </div>
          <article>
            {topSelling[index] && (
              <CustomText
                text={topSelling[index].name}
                textType="small"
                weightType="bold"
                extraStyle="text-ellipsis"
              />
            )}
            <div className="flex gap-3 items-center">
              {topSelling[index] && (
                <CustomText
                  text={`₦${String(topSelling[index].price)}`}
                  textType="extrasmall"
                  weightType="bold"
                  color="text-amber-500"
                />
              )}
              {topSelling[index] && (
                <CustomText
                  text={`₦${String(topSelling[index].oldprice)}`}
                  textType="extrasmall"
                  weightType="bold"
                  color="gray"
                  extraStyle="line-through"
                />
              )}
            </div>
          </article>
        </div>
      ))}
    </article>
  </section>
  )
}

export default TopSelling