import React, { useState, useEffect, ReactNode } from "react";
import { Popover, Image } from "antd";
import clsx from "clsx";
// components
import { Table, Tag } from "@/components";
import { useStyles } from "../../admin/messages/Messages.styles";
import type { TableColumnType } from "@/components";
// helpers
import { convertESTDateFormat, interpolateColor } from "@/helpers";
// styles
import { tableStyles } from "./table.styles";
// types
import { Vulnerability } from "./table.types";

interface dataProps {
  tableData: Vulnerability[];
  increaseCount: () => void;
}

const SatisficTable: React.FC<dataProps> = ({ tableData, increaseCount }) => {
  const [dataSource, setDataSource] = useState<Vulnerability[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const styles = useStyles();
  const tableStyle = tableStyles();

  const filterData = (sourceData: any) => {
    const array: Vulnerability[] = [];

    sourceData?.map((item: any) => {
      let exploit: any;
      const product: (object | undefined)[] = [];
      const vendor: (string | undefined)[] = [];

      item.affectedProductsEstimate?.forEach((data: any, index: number) => {
        product.push(data.products[0]);
        vendor.push(data.vendor);
      });

      const patched = item.patchDetails?.map((data: any) => {
        return data?.patchAddedDate;
      });

      if (item?.exploitedAt && Array.isArray(item?.exploitedAt))
        exploit = item?.exploitedAt[0];
      else exploit = 0;

      const object = {
        cve_id: item?.cveid,
        description: item?.description,
        cvss_score: item?.cvssV3?.baseScore,
        cvss_estimate: item?.cvssCategoryEstimate,
        epss_score: item?.epssScore,
        trend: {
          articleCount: item?.urlReferenceCount,
          graphURL: item?.smallGraphUrl,
        },
        graphUrl: item?.smallGraphUrl,
        exploit,
        product,
        vendor,
        patched,
        published: item?.publishedDate,
      };

      return array.push(object);
    });

    return array;
  };

  useEffect(() => {
    setLoadingPage(true);
    setDataSource(filterData(tableData));
    setLoadingPage(false);
  }, [tableData]);

  const columns: TableColumnType[] = [
    {
      title: "Published",
      dataIndex: "published",
      width: 100,
      render: (value: string) => convertESTDateFormat(value),
    },
    {
      width: 300,
      title: "CVE ID",
      dataIndex: "cve_id",
      key: "created_at",
      render: (value: string, record, index: number) => {
        return (
          <>
            <h3>{value}</h3>
            <p className="text-ellipsis max-w-250 text-gray-500 mb-0">
              {dataSource[index].description}
            </p>
          </>
        );
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      width: 100,
      render: (value) => {
        const array: any[] = value ? value.slice(1) : [];
        const options: ReactNode[] = array.map(
          (item: string, index: number) => <p key={index}>{item}</p>
        );
        const content = <div>{options}</div>;

        return value.length !== 0 ? (
          <div
            className={clsx(
              value.length < 2 ? "justify-center" : "items-center flex-column",
              "flex"
            )}
          >
            <p
              className="text-ellipsis mb-0"
              style={{ WebkitBoxOrient: "horizontal", maxWidth: 85 }}
            >
              {value[0]}
            </p>
            {value.length < 2 ? (
              <Tag
                className={clsx([
                  [tableStyle.tagStyle, tableStyle.innerTagStyle],
                  "font-poppines ml-1",
                ])}
              >
                AI
              </Tag>
            ) : (
              <Popover
                content={content}
                trigger="click"
                className="cursor-point"
              >
                <span>{value.length - 1}</span>
                <span> more</span>
              </Popover>
            )}
          </div>
        ) : (
          <div className="flex justify-center">-</div>
        );
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      width: 120,
      render: (value: any) => {
        const array: any[] = value ? value.slice(1) : [];

        const options: ReactNode[] = array.map((item: any, index: number) => (
          <p key={index}>{item.name}</p>
        ));
        const content = <div>{options}</div>;

        return Array.isArray(value) && value.length > 0 && value[0].name ? (
          <div
            className={clsx(
              value.length > 1 ? "items-center flex-column" : "justify-center",
              "flex"
            )}
          >
            <p
              className="text-ellipsis mb-0"
              style={{
                maxWidth: 85,
                WebkitLineClamp: 1,
                maxHeight: " calc(1.7em* 1)",
              }}
            >
              {value[0].name}
            </p>
            {value.length < 2 ? (
              <Tag
                className={clsx([
                  [tableStyle.tagStyle, tableStyle.innerTagStyle],
                  "font-poppines ml-1",
                ])}
              >
                AI
              </Tag>
            ) : (
              <Popover
                content={content}
                trigger="click"
                className="cursor-point"
              >
                <span>{value.length - 1}</span>
                <span> more</span>
              </Popover>
            )}
          </div>
        ) : (
          <div className="flex justify-center">-</div>
        );
      },
    },
    {
      title: "CVSS Score",
      dataIndex: "cvss_score",
      width: 130,
      render: (value: number) => {
        return value ? (
          <Tag
            className={clsx([tableStyle.tagStyle], "font-poppines")}
            style={{
              color: interpolateColor(value),
              borderColor: interpolateColor(value),
            }}
          >
            {value}
          </Tag>
        ) : (
          <Tag
            className={clsx(
              [tableStyle.tagStyle, tableStyle.noColor],
              "font-poppines"
            )}
          >
            -
          </Tag>
        );
      },
    },
    {
      title: "CVSS Estimate",
      dataIndex: "cvss_estimate",
      width: 150,
      render: (value: string) => {
        let colorValue = "";
        switch (value) {
          case "HIGH":
            colorValue = tableStyle.highColor;
            break;
          case "Medium":
            colorValue = tableStyle.mediumColor;
            break;
          default:
            colorValue = tableStyle.noColor;
            break;
        }
        return (
          <Tag
            className={clsx([tableStyle.tagStyle, colorValue], "font-poppines")}
          >
            {value ? value : <div>-</div>}
          </Tag>
        );
      },
    },
    {
      title: "EPSS Score",
      dataIndex: "epss_score",
      width: 90,

      render: (value: string) => (
        <div className="flex justify-center">
          {value ? `${(Number(value) * 100).toFixed(2)} %` : "-"}
        </div>
      ),
    },
    {
      title: "Trend",
      dataIndex: "trend",
      width: 200,

      render: (value) => {
        return value ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image src={value.graphURL} preview={false} height={42} />
            <span
              className="flex justify-center text-xs mt-2"
              style={{ color: "#498DCE" }}
            >
              {value.articleCount !== 0 ? value.articleCount : "No"} Articles
            </span>
          </div>
        ) : (
          <div className="flex justify-center">-</div>
        );
      },
    },
    {
      title: "Patched",
      dataIndex: "patched",
      width: 100,
      render: (value: any) => {
        return value === undefined ? (
          <div className="flex justify-center">-</div>
        ) : (
          convertESTDateFormat(value[0])
        );
      },
    },
    {
      title: "Exploit",
      dataIndex: "exploit",
      width: 100,
      render: (value: number) => convertESTDateFormat(value),
    },
  ];

  return (
    <div className="mt-4">
      <Table
        className={clsx([styles.messagesTable, tableStyle.tableContainer])}
        rowClassName={(record, index) =>
          index % 2 === 0 ? styles.tdStyleOdd : styles.tdStyleEven
        }
        rowKey="upload_date_time"
        bordered={false}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total: dataSource.length,
          position: ["bottomCenter"],
          defaultPageSize: 5,
          pageSize: dataSource.length,
          itemRender: (_, type, originalElement) => {
            if (type === "prev") {
              return <a>Previous</a>;
            }
            if (type === "next") {
              return <a>Next</a>;
            }
            return originalElement;
          },
          showSizeChanger: false,
        }}
        loading={loadingPage}
      />

      <p
        onClick={increaseCount}
        className="text-xs primary-color text-center mt-3 cursor-point"
      >
        Load more...
      </p>
    </div>
  );
};

export { SatisficTable };
