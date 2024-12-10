import React, { useState, useEffect } from "react";

import cx from "clsx";
import { useLocation } from "react-router-dom";

import { Col, Layout } from "antd";
// components
import { Head } from "@/components/organisms/head";
import { Galances } from "./galances";
import { SatisficTable } from "./satisfic-table";
import { SearchForm } from "./search-form";
import { ChartPanel } from "./charts";
// services
import {
  reportService,
  uploadService,
  messagesService,
  feedlyService,
} from "@/services";
// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";
// styles
import { useStyles } from "./Dashboard.styles";
import Title from "antd/es/typography/Title";
// types
import { Vulnerability } from "./satisfic-table/table.types";
import { chartData, pieData, filterOptions } from "./Dashboard.types";
import { searchFormValues } from "./search-form/form.types";
// helpers
import { removeSpacesUsingSplit } from "@/helpers";
import { convertParameter } from "./Dashboard.utility";
// constants
import { initialOptions, initialParams } from "./Dashboard.contants";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const count = 5;
  const [totalReports, setTotalReports] = useState<Number>(0);
  const [totalUploads, setTotalUploads] = useState<Number>(0);
  const [totalMessages, setTotalMessages] = useState<Number>(0);
  const [loadingVulnerability, setLoadingVulnerability] =
    useState<boolean>(false);
  const [vulnerabilityData, setVulnerabilityData] = useState<Vulnerability[]>(
    []
  );
  const [chartData, setChartData] = useState<chartData>({} as any);
  const [params, setParams] = useState<searchFormValues>(initialParams);
  const [filterOption, setFilterOption] = useState<filterOptions>(
    initialOptions(count)
  );
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [showSize, setShowSize] = useState<number>(count);
  const [pieData, setPieData] = useState<pieData>({} as any);

  const accessToken = useAppSelector(selectAccessToken);

  const styles = useStyles();
  const location = useLocation();

  const getPieChartData = (data: any) => {
    const totalSum = data.reduce(
      (accumulator: number, item: any) => accumulator + Number(item.total),
      0
    );

    const newArray = data.map((item) => ({
      ...item,
      average: Math.round((Number(item.total) / totalSum) * 100),
    }));
    return newArray;
  };

  const paramOptions = (params: searchFormValues) => {
    setFilterLoading(true);
    const parameterField: string = convertParameter(params.parameter);

    const layers = [
      {
        filters: [
          {
            field: "period",
            value: {
              label: params.dateRange,
              type: removeSpacesUsingSplit(params.dateRange),
            },
          },
        ],
      },
      parameterField
        ? {
            filters: [
              {
                field: parameterField,
                value: true,
              },
            ],
          }
        : {},
    ];

    const filter = {
      count: showSize,
      layers: layers,
      sort: {
        field: "cveId",
        order: "desc",
      },
      type: "vulnerability",
    };

    setFilterOption(filter);
    setFilterLoading(false);
  };

  const fetchvulnerabilityData = async () => {
    setLoadingVulnerability(true);
    try {
      const data: any = await feedlyService.getVulnerabilityData({
        token: accessToken,
        param: filterOption,
      });
      setVulnerabilityData(data.vulnerabilities);

      setChartData({
        total: data.total,
        weaponized: data.aggregations.weaponized.total,
        exploited: data.aggregations.exploited.total,
      });

      setPieData({
        vendorsData: getPieChartData(data.aggregations.vendors.buckets),
        weaponizedData: getPieChartData(
          data.aggregations.malwareFamilies.buckets
        ),
        exploitedData: getPieChartData(data.aggregations.threatActors.buckets),
      });
    } catch (err) {
      console.log(err);
      setLoadingVulnerability(false);
    } finally {
      setLoadingVulnerability(false);
    }
  };

  const fetchReports = async () => {
    try {
      // load reports
      const { metadata } = await reportService.getAllReports({
        token: accessToken,
        filters: {
          dbconnstrs: [
            "corespecialty?schema=customer",
            "dummy_customer?schema=customer",
          ],
        },
      });
      setTotalReports(metadata.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUploads = async () => {
    try {
      // load uploads
      const { metadata } = await uploadService.getAllUploads({
        token: accessToken,
        filters: {
          dbconnstrs: [
            "corespecialty?schema=customer",
            "dummy_customer?schema=customer",
          ],
        },
      });
      setTotalUploads(metadata.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      // load messages
      const { metadata } = await messagesService.getAllMessages({
        token: accessToken,
        filters: {
          dbconnstrs: [
            "corespecialty?schema=customer",
            "dummy_customer?schema=customer",
          ],
        },
      });
      setTotalMessages(metadata.total);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseCount = () => {
    setShowSize(vulnerabilityData.length + count);
  };

  useEffect(() => {
    if (accessToken) {
      fetchReports();
      fetchUploads();
      fetchMessages();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      paramOptions(params);
    }
  }, [accessToken, params, showSize]);

  useEffect(() => {
    if (!filterLoading) {
      fetchvulnerabilityData();
    }
  }, [filterOption]);

  return (
    <Col
      className={cx(location.pathname === "/dashboard" && { marginRight: 400 })}
    >
      <Head />
      <div className="dashboard-page-container">
        <div className="w-full">
          <SearchForm setParams={setParams} params={params} />
        </div>
        <ChartPanel valueData={chartData} pieData={pieData} />
        <div className="mt-10 w-full">
          <Title
            className="font-poppines"
            style={{ fontSize: 20, color: "#FFFFFF", alignSelf: "start" }}
          >
            Vulnerabilites
          </Title>
          <SatisficTable
            tableData={vulnerabilityData}
            increaseCount={increaseCount}
          />
        </div>
        <div className="mt-8">
          <Galances
            totalReports={totalReports}
            totalUploads={totalUploads}
            totalMessages={totalMessages}
          />
        </div>
      </div>
    </Col>
  );
};

export { Dashboard };
