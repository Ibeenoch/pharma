import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { inventoryData } from "../../../utils/admin/dashBoardLists";
import CustomText from "../../common/Text";

// Custom legend component
const CustomLegend: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      {inventoryData.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          ></span>
          <span className="text-gray-700 text-sm">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

const InventoryPieChart: React.FC = () => {
  return (
    <div className="p-0 lg:p-4 shadow-lg rounded-lg h-max bg-neutral-50 flex items-center">
      <div className="w-2/3">
        <CustomText
          text="Inventory Details"
          textType="medium"
          weightType="semibold"
          extraStyle="p-2"
        />
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={inventoryData}
              cx="50%"
              cy="50%"
              innerRadius={70} // Creates a donut effect
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-2 w-1/3 flex lg:justify-center items-center">
        <CustomLegend />
      </div>
    </div>
  );
};

export default InventoryPieChart;
