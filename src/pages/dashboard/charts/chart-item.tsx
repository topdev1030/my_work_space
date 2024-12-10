import React from "react";
import { Space } from "antd";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import { useStyles } from "./chart.styles";

Chart.register(ArcElement, Tooltip, Legend);

interface IChartItem {
  header_label: string;
  header_value: number;
  subTitle: string;
  dataSet: Array<any>;
  noTitle: string;
}

const ChartItem: React.FC<IChartItem> = (props) => {
  const { header_label, header_value, subTitle, dataSet, noTitle } = props;

  const topFive = dataSet?.slice(0, 5);
  const otherItems = dataSet?.slice(5);

  // Sum the totals and averages of the remaining elements
  let otherTotal = 0;
  let otherAverage = 0;
  let total = 0;

  for (let i = 5; i < dataSet?.length; i++) {
    otherTotal += dataSet[i].total;
  }

  for (let i = 0; i < dataSet?.length; i++) {
    total += dataSet[i].total;
  }

  otherAverage = Math.round((otherTotal / total) * 100);

  // Create the "other" object
  const otherObject = {
    id: "",
    label: "Others",
    total: otherTotal,
    average: otherAverage,
  };

  // Form the new array
  const newArray = topFive?.concat(otherObject);

  const formattedArray = newArray?.map(
    (item) => `${item.label} ${item.average}%`
  );
  const dataValue = newArray?.map((item) => item.average);

  const styles = useStyles();

  const data = {
    labels: formattedArray,
    datasets: [
      {
        label: "Most Affected Vendors and Products",
        data: dataValue,
        backgroundColor: [
          "#A5F167", // Green for Tianocore
          "#F7FF5F", // Yellow for Microsoft
          "#FF7B23", // Orange for Array
          "#C38A39", // Light blue for ISC
          "#498DCE", // Blue for Fedora
          "#83C8EE", // Gray for Others
        ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          marginBottom: 10,
          padding: 20,
          cursor: "pointer",
          color: "#6B6B6B",
          font: {
            family: "Poppins-Medium",
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return dataSet?.length > 2 ? (
    <div className="w-full relative border-radius-40 dashboard-chart-card padding-5">
      <div className="w-full padding-3">
        <p className="text-lg text-gray-500 mb-0">{header_label}</p>
        <h1 className="text-5xl text-white mb-0">
          {header_value > 1000
            ? `${Math.floor(header_value / 1000)}K`
            : header_value}
        </h1>
        <p className="text-base text-gray-500 mt-5">{subTitle}</p>
      </div>
      <div
        className={clsx(styles.chart, "w-full relative flex justify-center")}
      >
        <Space align="center">
          <Doughnut data={data} options={options} />
        </Space>
      </div>{" "}
    </div>
  ) : (
    <div className="w-full relative border-radius-40 dashboard-chart-card padding-5 flex items-center text-center h-full">
      <div className="text-base text-gray-500">{noTitle}</div>
    </div>
  );
};

export { ChartItem };
