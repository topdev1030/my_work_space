import React from "react";
import { Row, Col } from "antd";
// components
import { ChartItem } from "./chart-item";
// types
import { chartData, pieData } from "../Dashboard.types";

interface chartProps {
  valueData: chartData;
  pieData: pieData;
}

export const ChartPanel: React.FC<chartProps> = ({ valueData, pieData }) => {
  return (
    <div className="w-full mt-10">
      <Row gutter={32} justify="space-between">
        <Col span={8}>
          <ChartItem
            header_label="Total Vulnerabilities"
            header_value={valueData.total}
            dataSet={pieData.vendorsData}
            subTitle="Most affected vendors and products"
            noTitle=""
          />
        </Col>
        <Col span={8}>
          <ChartItem
            header_label="Weaponized Vulnerabilities"
            header_value={valueData.weaponized}
            dataSet={pieData.weaponizedData}
            subTitle="Attribution of Malware Families"
            noTitle="No attribution of malware families available at the moment."
          />
        </Col>
        <Col span={8}>
          <ChartItem
            header_label="Exploited Vulnerabilities"
            header_value={valueData.exploited}
            dataSet={pieData.exploitedData}
            subTitle="Attribution of Threat Actors"
            noTitle="No attribution of threat actors available at the moment."
          />
        </Col>
      </Row>
    </div>
  );
};
