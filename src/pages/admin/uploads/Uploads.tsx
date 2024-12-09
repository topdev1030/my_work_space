import { useState, useEffect, useCallback } from "react";

import moment from "moment";

// Icon Imports
import viewIcon from "../../../static/images/view.png";
import viewCardIcon from "../../../static/images/view_expand.png";
import viewDetailIcon from "../../../static/images/viewIcon.png";
import downloadIcon from "../../../static/images/downloadIcon.png";

import { SearchOutlined, FilterOutlined } from "@ant-design/icons";

import {
  Row,
  Col,
  Image,
  Select,
  Card,
  Space,
  Form,
  Divider,
  Pagination as CardPagination,
  PaginationProps,
} from "antd";

import type {
  TablePaginationConfig,
  SorterResult,
} from "antd/es/table/interface";
import debounce from "debounce";
import dayjs from "dayjs";

// components
import type { TableColumnType } from "@/components";
import { Button, Input, Table, FilterDropdown, Typography } from "@/components";

// Import TransitionGroup for animation
import { TransitionGroup, CSSTransition } from "react-transition-group";

// helpers
import { downloadFile } from "@/helpers";

// services
import { commonService, uploadService, hookService } from "@/services";

// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";

// types
import type { Upload, Pagination } from "@/types";
import type { AllUploadsFilters } from "@/services/upload";
import type { CustomerOption } from "./Uploads.types";

// constants
import { DEFAULT_PAGE_SIZE } from "@/components/atoms/table";
import { DEBOUNCE_WAIT, DEFAULT_SORTER } from "./Uploads.constants";

// styles
import { useStyles } from "./Uploads.styles";

import { FooterBar } from "@/components/organisms/footer";

const { Title, Text } = Typography;

interface SearchDataType {
  cust_id: string;
  upload_date_time: string;
}

const AdminUploads = () => {
  const date_options = [
    {
      key: "0",
      value: "Till Today",
    },
    {
      key: "1",
      value: "1 Week",
    },
    {
      key: "2",
      value: "1 Month",
    },
    {
      key: "3",
      value: "1 Year",
    },
  ];

  const sort_report_options = [
    {
      key: "date",
      value: "Date",
    },
    {
      key: "customer_name",
      value: "Customer Name",
    },
  ];

  const [form] = Form.useForm();

  const [isTableView, setIsTableView] = useState<boolean>(true);

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [filters, setFilters] = useState<AllUploadsFilters>({});
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: DEFAULT_PAGE_SIZE,
    sort: DEFAULT_SORTER,
  });
  const [loadingUploads, setLoadingUploads] = useState<boolean>(true);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Upload[]>([]);
  const [dataSourceTemp, setDataSourceTemp] = useState<Upload[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);

  const accessToken = useAppSelector(selectAccessToken);

  const styles = useStyles();

  useEffect(() => {
    setIsTableView(
      localStorage.getItem("omega-admin-uploads-page-view") == "false"
        ? false
        : true
    );
  }, []);

  const getUploadFilters = useCallback(() => {
    const { dbconnstrs = [] } = filters;
    if (dbconnstrs.length > 0) return filters;
    return {
      ...filters,
      dbconnstrs: customerOptions.map(({ value }) => value),
    };
  }, [filters, customerOptions]);

  const getUploadSorter = (
    sorter: SorterResult<Upload> | SorterResult<Upload>[]
  ) => {
    const { order, field } = Array.isArray(sorter) ? sorter[0] : sorter;
    if (order && field) {
      return `${order === "ascend" ? "-" : ""}${field}`;
    }
    return DEFAULT_SORTER;
  };

  const fetchOptions = async () => {
    setLoadingOptions(true);
    try {
      // load customer options
      const customers = await commonService.getCustomers(accessToken);
      const newCustomerOptions = customers.map(
        ({ cust_id, dbconnstr, customer_name }) => ({
          cust_id,
          label: customer_name,
          value: dbconnstr,
        })
      );
      setCustomerOptions(newCustomerOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const fetchUploads = async () => {
    setLoadingUploads(true);
    try {
      // load uploads
      const { uploads, metadata } = await uploadService.getAllUploads({
        token: accessToken,
        filters: getUploadFilters(),
        offset: 0,
        limit: -1,
      });
      setDataSource(uploads);
      setDataSourceTemp(uploads);
      setTotalCount(metadata.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUploads(false);
    }
  };

  const onChangeUploadedByFilter = debounce((value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      uploaded_by: value,
    }));
  }, DEBOUNCE_WAIT);

  const onTableChange = (
    { current, pageSize }: TablePaginationConfig,
    __,
    sorter: SorterResult<Upload> | SorterResult<Upload>[]
  ) => {
    if (current && pageSize) {
      setPagination({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        sort: getUploadSorter(sorter),
      });
    }
  };

  const onOpenUploadFile = async (url: string) => {
    try {
      // generate upload file url
      const { sasToken } = await hookService.getSASToken({
        token: accessToken,
      });
      const uploadFileUrl = `${url}?${sasToken}`;

      // open upload file
      window.open(uploadFileUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const onDownloadUploadUrl = async (url: string) => {
    try {
      // generate upload url & file name
      const { sasToken } = await hookService.getSASToken({
        token: accessToken,
      });
      const uploadFileUrl = `${url}?${sasToken}`;
      const uploadFileName = url.split("/").pop() || "upload_file";

      // download upload file
      downloadFile(uploadFileUrl, uploadFileName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchOptions();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchUploads();
    }
  }, [accessToken, customerOptions, filters, pagination]);

  const handleSortChange = (value) => {
    const sorted = [...dataSource].sort((a, b) => {
      if (value === "Customer Name") {
        return a.cust_id.localeCompare(b.cust_id);
      }
      if (value === "Date") {
        return (
          new Date(b.upload_date_time).getTime() -
          new Date(a.upload_date_time).getTime()
        );
      }
      return 0;
    });
    setDataSource(sorted);
  };

  const resetClearForm = () => {
    form.resetFields();
    if (dataSource.length !== totalCount) {
      setDataSource(dataSourceTemp);
    }
  };

  const handleSearch = (values: {
    cust_id: string;
    upload_date_time: string;
  }) => {
    const { cust_id, upload_date_time } = values;
    const now = moment();
    const dateRangeMap: { [key: string]: moment.Moment } = {
      "1 Week": now.clone().subtract(1, "week"),
      "1 Month": now.clone().subtract(1, "month"),
      "1 Year": now.clone().subtract(1, "year"),
    };
    const tempD = dataSourceTemp;
    const filtered = tempD.filter((entry) => {
      let isCustIdMatch = true;
      let isUploadDateTimeMatch = true;

      // Check for cust_id match
      if (cust_id) {
        const custIdStr = String(cust_id).toLowerCase();
        const entryEmail = String(entry.uploaded_by || "").toLowerCase();
        const getCustIdsData = customerOptions.filter((item) =>
          String(item.label).toLowerCase().includes(custIdStr)
        );
        const getCustIds = getCustIdsData.map((item) => item.cust_id);
        isCustIdMatch =
          getCustIds.join(" ").includes(entry.cust_id) ||
          entryEmail.includes(custIdStr);
      } else isCustIdMatch = true;

      // Check for upload_date_time match
      if (upload_date_time) {
        if (upload_date_time !== "Till Today") {
          const entryDate = moment(entry.upload_date_time);
          const rangeStart = dateRangeMap[upload_date_time];
          const now = moment(); // Ensure 'now' is defined

          if (rangeStart) {
            isUploadDateTimeMatch = entryDate.isBetween(
              rangeStart,
              now,
              undefined,
              "[]"
            ); // Inclusive range
          } else {
            isUploadDateTimeMatch = false;
          }
        }
      } else {
        // No upload_date_time filter specified, all entries pass
        isUploadDateTimeMatch = true;
      }

      return isCustIdMatch && isUploadDateTimeMatch;
    });

    if ((cust_id === "" || cust_id == undefined) && !upload_date_time) {
      if (dataSource.length !== totalCount) {
        setDataSource(dataSourceTemp);
      }
    } else {
      setDataSource(filtered);
    }
  };

  const columns: TableColumnType[] = [
    {
      title: "Upload Date",
      dataIndex: "upload_date_time",
      width: "10%",
      filterIcon: <FilterOutlined />,
      render: (value) => dayjs(value).format("MM/DD/YYYY"),
    },
    {
      title: "Customers",
      dataIndex: "cust_id",
      filterIcon: <FilterOutlined />,
      render: (value) => {
        return customerOptions.find((opt) => opt.cust_id === value)?.label;
      },
    },
    {
      title: "Uploaded by",
      dataIndex: "uploaded_by",
      width: "30%",
      filterIcon: <FilterOutlined />,
    },
    {
      title: "Action",
      dataIndex: "url",
      align: "center",
      width: "10%",
      render: (value) => (
        <div className={styles.uploadFileCol}>
          <Button
            shape="circle"
            style={{ border: 0, backgroundColor: "transparent" }}
            icon={<Image preview={false} src={viewDetailIcon} />}
            onClick={() => onOpenUploadFile(value)}
          />
          <Divider
            style={{
              borderColor: "#667075",
              borderWidth: 2,
              marginInline: 0,
            }}
            type="vertical"
          />
          <Button
            shape="circle"
            style={{ border: 0, backgroundColor: "transparent" }}
            icon={<Image preview={false} src={downloadIcon} />}
            onClick={() => onDownloadUploadUrl(value)}
          />
        </div>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const pageSize = 6; // Number of cards per page

  // Get current page <data>
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = dataSource.slice(startIndex, startIndex + pageSize);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Change the pagenation previous and next button
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text className={styles.title}>Uploads</Text>
      </div>
      <div className={styles.searchContainer}>
        <Title className={styles.panelTitle}>Search Panel</Title>
        <Form form={form} onFinish={handleSearch}>
          <Row className={styles.searchOptionContainer} gutter={32}>
            <Col className={styles.fieldContainer} flex={4}>
              <Form.Item
                name="cust_id"
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Title className={styles.fieldTitle}>Search</Title>
                <Input
                  size="large"
                  placeholder=" Enter customer or email"
                  className={styles.searchBar}
                  prefix={<SearchOutlined />}
                  onChange={(e) => {
                    form.setFieldValue("cust_id", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Form.Item
                name="upload_date_time"
                initialValue="Till Today"
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Title className={styles.fieldTitle}>Date</Title>
                <Select
                  defaultValue=""
                  placeholder="Till Today"
                  className={styles.selectBar}
                  options={date_options}
                  onChange={(value) =>
                    form.setFieldValue("upload_date_time", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={1}>
              <Button
                htmlType="submit"
                className={styles.searchBtn}
                disabled={loadingUploads}
              >
                <Text className={styles.createBtn}>Search</Text>
              </Button>
            </Col>
            <Col className={styles.fieldContainer} flex={1}>
              <Button
                onClick={resetClearForm}
                className={styles.clearBtn}
                disabled={loadingUploads}
              >
                <Text className={styles.createBtn}>Clear</Text>
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className={styles.OptionContainer} gutter={32}>
          <Col flex={5}>
            <Title className={styles.optionTitle}>
              List of Uploaded files ({dataSource.length})
            </Title>
          </Col>
          <Col flex={1}>
            <Row className={styles.OptionContainer}>
              <Col className={styles.sortContainer} flex={4}>
                <Title className={styles.sortTitle}>Sort:</Title>
                <Select
                  defaultValue="Date"
                  style={{ flex: 1 }}
                  className={styles.sortBar}
                  placeholder="Date"
                  options={sort_report_options}
                  onChange={handleSortChange}
                />
              </Col>
              <Col className={styles.viewIconContainer} flex={1}>
                <Image
                  width={35}
                  height={35}
                  className={styles.viewIcon}
                  src={isTableView ? viewIcon : viewCardIcon}
                  preview={false}
                  onClick={() => {
                    localStorage.setItem(
                      "omega-admin-uploads-page-view",
                      `${!isTableView}`
                    );
                    setIsTableView(!isTableView);
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      {/* Show the reports data with table */}
      <TransitionGroup>
        <CSSTransition
          key={isTableView ? "table" : "cards"}
          classNames="fade"
          timeout={500}
        >
          {isTableView ? (
            <div className={styles.content}>
              <Table
                className={styles.uploadsTable}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? styles.tdStyleOdd : styles.tdStyleEven
                }
                rowKey="upload_date_time"
                bordered={false}
                columns={columns}
                dataSource={dataSource}
                expandable={{
                  defaultExpandAllRows: true,
                }}
                pagination={{
                  total: dataSource.length,
                  position: ["bottomCenter"],
                  defaultPageSize: 5,
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
                loading={loadingUploads}
                onChange={onTableChange}
              />
            </div>
          ) : (
            <div style={{ marginTop: 15 }}>
              <Row gutter={[24, 24]} justify="start">
                {currentData.map((upload, index) => (
                  <Col xs={24} sm={16} md={12} lg={8} key={index}>
                    <Card
                      className={styles.cardContainer}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#282828" : "transparent",
                      }}
                    >
                      <Row justify="space-between" align="middle">
                        <Col>
                          <Text className={styles.subtitle}>Upload Date</Text>
                          <br />
                          <Text className={styles.value}>
                            {dayjs(
                              new Date(upload.upload_date_time)
                                .toISOString()
                                .split("T")[0]
                            ).format("MM/DD/YYYY")}
                          </Text>
                        </Col>
                        <Col>
                          <Space>
                            <Button
                              icon={
                                <Image preview={false} src={viewDetailIcon} />
                              }
                              type="link"
                              style={{
                                border: 0,
                                backgroundColor: "transparent",
                              }}
                            />
                            <Divider
                              style={{
                                borderColor: "#667075",
                                borderWidth: 2,
                                marginInline: 0,
                              }}
                              type="vertical"
                            />
                            <Button
                              icon={
                                <Image preview={false} src={downloadIcon} />
                              }
                              type="link"
                              style={{
                                border: 0,
                                backgroundColor: "transparent",
                              }}
                            />
                          </Space>
                        </Col>
                      </Row>
                      <Divider
                        style={{
                          borderColor: index % 2 === 0 ? "#000" : "#282828",
                        }}
                      />
                      <Row gutter={[16, 16]} style={{ rowGap: 10 }}>
                        <Col xs={24} sm={16}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Customers</Text>
                            <p className={styles.value}>
                              {
                                customerOptions.find(
                                  (opt) => opt.cust_id === upload.cust_id
                                )?.label
                              }
                            </p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={16}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Uploaded by</Text>
                            <p className={styles.value}>{upload.uploaded_by}</p>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className={styles.cardPagination}>
                <CardPagination
                  current={currentPage}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  total={dataSource.length}
                  onChange={handlePageChange}
                  itemRender={itemRender}
                  responsive
                />
              </div>
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export { AdminUploads };
