import { lazy } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
const CustomText = lazy(() => import("../../common/Text"));
import { salesData } from "../../../utils/admin/dashBoardLists";
import {
  darkblue,
  darkGreen,
  darkred,
  darkyellow,
} from "../../../constants/appColor";
import { AllOrderResultData } from "../../../types/order/OrderType";
import { mappedSales } from "../../../utils/orders/orderHistoryMap";

interface SalesChartProps{
  orders: AllOrderResultData[]
}

const SalesChart: React.FC<SalesChartProps> = ({ orders }) => {
  const orderMapped = mappedSales(orders);
  console.log('all orders ', orderMapped)
  // Function to transform data into chart format
  const processData = (data: typeof salesData) => {
    
    const groupedData: { [key: string]: any } = {};
  
    data.forEach(({ month, category, qty }) => {
      if (!groupedData[month]) {
        groupedData[month] = { month };
      }
      groupedData[month][category] = qty;
    });
  
    return Object.values(groupedData);
  };
  
  // Processed data for recharts
  // const data = processData(orderMapped);
  const data = processData(salesData);
  
  // Define colors for each category
  const categoryColors: { [key: string]: string } = {
    Painkiller: darkblue,
    Antibiotics: darkred,
    Vitamins: darkGreen,
    "Cough Syrup": darkyellow,
  };
  
  // Custom legend component
  const CustomLegend: React.FC = () => {
    return (
      <div className="flex justify-center gap-2 lg:gap-4 mb-2 pt-2 px-2">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span className="text-gray-700 text-[10px] md:text-sm">{category}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="py-4 shadow-lg my-3 rounded-lg bg-neutral-50">
      <CustomText
        text="Sales Performance"
        textType="medium"
        weightType="semibold"
        extraStyle="px-4"
      />

      {/* Custom Legend at the top */}
      <CustomLegend />

      <ResponsiveContainer width="100%" height={300} className="text-xs">
        <BarChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
          barGap={10} // Controls space between bars
          barCategoryGap={15} // Controls space between groups
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          {Object.keys(categoryColors).map((category) => (
            <Bar
              key={category}
              dataKey={category}
              fill={categoryColors[category]}
              barSize={20} // Adjust bar width
              radius={[5, 5, 0, 0]} // Rounded top edges only
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
