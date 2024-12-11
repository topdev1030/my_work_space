import { useState, useEffect, useCallback, useMemo } from "react";
import moment from "moment";

import {
  Row,
  Col,
  Image,
  message,
  Select,
  Form,
  Card,
  Space,
  Divider,
  Pagination as CardPagination,
  PaginationProps,
} from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import type { UploadRequestOption } from "rc-upload/lib/interface";

import { SearchOutlined } from "@ant-design/icons";

import FileUploadIcon from "../../../static/images/file_upload.png";

import debounce from "debounce";
import dayjs, { Dayjs } from "dayjs";

// components
import {
  Button,
  Input,
  Modal,
  PdfViewerV2,
  Table,
  Upload,
  FilterDropdown,
  Popconfirm,
  Typography,
} from "@/components";
import type { TableColumnType } from "@/components";

// services
import {
  commonService,
  reportService,
  azureService,
  hookService,
} from "@/services";
import type { UploadFilePayload } from "@/services";

// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken, selectUserInfo } from "@/redux/auth";

// helpers
import { downloadFile, getStorgeHostUrl } from "@/helpers";

// types
import { Option, Report, Pagination } from "@/types";
import { AllReportsFilters } from "@/services/report";
import {
  CustomerOption,
  SubsidiaryOption,
  CreateReportFormValues,
} from "./Reports.types";

// Import TransitionGroup for animation
import { TransitionGroup, CSSTransition } from "react-transition-group";

// constants
import { DEFAULT_PAGE_SIZE } from "@/components/atoms/table";
import { DEBOUNCE_WAIT, formLayout } from "./Reports.constants";

// styles
import { useStyles } from "./Reports.styles";
import axios from "axios";
import config from "@/config";
import { defaultRequestHeaders } from "@/constants";

// Icon Imports
import viewIcon from "../../../static/images/view.png";
import viewCardIcon from "../../../static/images/view_expand.png";
import viewDetailIcon from "../../../static/images/viewIcon.png";
import deleteIcon from "../../../static/images/deleteIcon.png";
import downloadIcon from "../../../static/images/downloadIcon.png";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const AdminReports = () => {
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
      key: "report_type",
      value: "Report Type",
    },
    {
      key: "customer_name",
      value: "Customer Name",
    },
    {
      key: "report_name",
      value: "Report Name",
    },
  ];

  const [isTableView, setIsTableView] = useState<boolean>(true);

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [subsidiariesOptions, setSubsidiariesOptions] = useState<
    SubsidiaryOption[]
  >([]);
  const [reportTypeOptions, setReportTypeOptions] = useState<Option[]>([]);
  const [filters, setFilters] = useState<AllReportsFilters>({});
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [loadingReports, setLoadingReports] = useState<boolean>(true);
  const [creatingReport, setCreatingReport] = useState<boolean>(false);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Report[]>([]);
  const [dataSourceTemp, setDataSourceTemp] = useState<Report[]>([]);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [currentCustomerOption, setCurrentCustomerOption] =
    useState<CustomerOption>();
  const [openPdfPreviewModal, setOpenPdfPreviewModal] =
    useState<boolean>(false);
  const [openCreateReportModal, setOpenCreateReportModal] =
    useState<boolean>(false);

  const [form] = Form.useForm();

  const accessToken = useAppSelector(selectAccessToken);
  const userInfo = useAppSelector(selectUserInfo);

  const styles = useStyles();

  useEffect(() => {
    setIsTableView(
      localStorage.getItem("omega-admin-report-page-view") == "false"
        ? false
        : true
    );
  }, []);

  const getReportFilters = useCallback(() => {
    const { dbconnstrs = [] } = filters;
    if (dbconnstrs.length > 0) return filters;
    return {
      ...filters,
      dbconnstrs: customerOptions.map(({ value }) => value),
    };
  }, [filters, customerOptions]);

  const connStr2CustID = useCallback(
    (connStr: string) => {
      const customer = customerOptions.find(({ value }) => value === connStr);
      return customer?.cust_id || "";
    },
    [customerOptions]
  );

  const fetchOptions = async () => {
    setLoadingOptions(true);
    try {
      // load customer options
      const customers = await commonService.getCustomers(accessToken);
      const newCustomerOptions = customers.map(
        ({ cust_id, storage_container_name, dbconnstr, customer_name }) => ({
          cust_id,
          storage_container_name,
          label: customer_name,
          value: dbconnstr,
        })
      );
      setCustomerOptions(newCustomerOptions);

      // load subsidiaries options
      const subsidiaries = await commonService.getSubsidiaries({
        token: accessToken,
      });
      const newSubsidiaries = subsidiaries.map(
        ({ id, org_id, subsidiary_name }) => ({
          org_id,
          label: subsidiary_name,
          value: id,
        })
      );
      setSubsidiariesOptions(newSubsidiaries);

      // load report types
      const reportTypes = await commonService.getReportTypes(accessToken);
      const newReportTypeOptions = reportTypes.map(
        ({ report_type_id, report_type }) => ({
          value: report_type_id,
          label: report_type,
        })
      );
      setReportTypeOptions(newReportTypeOptions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      // load reports
      const { reports, metadata } = await reportService.getAllReports({
        token: accessToken,
        filters: getReportFilters(),
        offset: 0,
        limit: -1,
      });
      setDataSource(reports);
      setDataSourceTemp(reports);
      setTotalCount(metadata.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReports(false);
    }
  };

  const onChangeReportNameFilter = debounce((value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      report_name: value,
    }));
  }, DEBOUNCE_WAIT);

  const onChangeUploadedByFilter = debounce((value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      uploaded_by: value,
    }));
  }, DEBOUNCE_WAIT);

  const onDelete = async ({ cust_id, report_id }: Report) => {
    try {
      // delete report & reload table
      await reportService.deleteReport({
        cust_id,
        report_id,
        token: accessToken,
      });
      await fetchReports();

      // notify message
      message.success("A reported was deleted successfully.");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete a report, try again later.");
    }
  };

  const onTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    if (current && pageSize) {
      setPagination({
        offset: (current - 1) * pageSize,
        limit: pageSize,
      });
    }
  };

  const onOpenPDFReportPreview = async (url: string) => {
    try {
      // generate report pdf url
      const { sasToken } = await hookService.getSASToken({
        token: accessToken,
      });
      const reportPdfUrl = `${url}?${sasToken}`;

      // update pdf url
      setPdfUrl(reportPdfUrl);
      setOpenPdfPreviewModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const onDownloadPDFReport = async (url: string) => {
    try {
      // generate report pdf url
      const { sasToken } = await hookService.getSASToken({
        token: accessToken,
      });
      const reportPdfUrl = `${url}?${sasToken}`;
      const findName = dataSource?.find((item) => item?.url === url);
      let reportName = "";

      if (findName?.report_name) {
        reportName = findName.report_name;
        reportName = reportName.replace(/ /g, "_");
      }
      // update pdf url
      downloadFile(reportPdfUrl, reportName || "report.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  const onCustomRequest = async ({
    file,
    onProgress,
    onSuccess,
    onError,
  }: UploadRequestOption) => {
    try {
      if (!currentCustomerOption) return;

      // get storage container name
      const { storage_container_name } = currentCustomerOption;

      // generate blob name
      const fileName = (file as File).name;
      const extension = fileName.slice(fileName.lastIndexOf(".") + 1);
      const blobName = `${dayjs().valueOf()}.${extension}`;

      // upload blob to azure storage
      const payload: UploadFilePayload = {
        file: file as Blob,
        blobName,
        containerName: storage_container_name,
        token: accessToken,
        onProgress: (percent) => onProgress?.({ percent }),
      };
      await azureService.uploadFile(payload);
      onSuccess?.(null);

      // update url field value
      form.setFieldsValue({
        url: `${getStorgeHostUrl()}/${storage_container_name}/${blobName}`,
      });
    } catch (error: any) {
      onError?.(error);
      message.error("Failed to upload a file, try again!");
    }
  };

  const sendMessageToAllUsers = async () => {
    try {
      const currentdate = new Date();
      const dataToSave = {
        title: "New report has been uploaded",
        body: "A new report has been uploaded to the secure portal.",
      };

      const url = `${config.api.baseUrl}/upload/sendNotification`;
      const response = await axios.post(
        url,
        {
          data: dataToSave,
          timestamp: currentdate,
        },
        {
          headers: {
            ...defaultRequestHeaders,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const onSubmitCreateReportForm = async (values: CreateReportFormValues) => {
    setCreatingReport(true);

    try {
      await reportService.createReport({
        ...values,
        cust_id: connStr2CustID(values.cust_id),
        upload_date_time: dayjs().toISOString(),
        uploaded_by: userInfo?.email,
        token: accessToken,
      });
      await fetchReports();

      // reset form & close modal
      form.resetFields();
      setOpenCreateReportModal(false);

      // notify message
      message.success("A reported was created successfully.");
      sendMessageToAllUsers();
    } catch (error) {
      console.log(error);
      message.error("Failed to create a report, try again later.");
    } finally {
      setCreatingReport(false);
    }
  };

  const onChangeReportCustomer = (newValue: string) => {
    const customer = customerOptions.find(({ value }) => value === newValue);
    setCurrentCustomerOption(customer);
    form.resetFields(["subsidiary_id", "url"]);
  };

  const onResetCreateReportForm = () => {
    form.resetFields();
  };

  const onCloseCreateReportModal = () => {
    setOpenCreateReportModal(false);
    form.resetFields();
  };

  useEffect(() => {
    if (accessToken) {
      fetchOptions();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      fetchReports();
    }
  }, [accessToken, customerOptions]);

  const filteredSubsidiariesOptions = useMemo(
    () =>
      subsidiariesOptions.filter(
        ({ org_id }) => org_id === currentCustomerOption?.cust_id
      ),
    [subsidiariesOptions, currentCustomerOption]
  );

  const handleSortChange = (value) => {
    const sorted = [...dataSource].sort((a, b) => {
      switch (value) {
        case "Customer Name":
          return a.cust_id.localeCompare(b.cust_id);
          break;
        case "Date":
          return (
            new Date(b.upload_date_time).getTime() -
            new Date(a.upload_date_time).getTime()
          );
          break;
        case "Report Type":
          return a.report_type.localeCompare(b.report_type);
          break;
        case "Report Name":
          return a.report_type.localeCompare(b.report_name);
          break;
        default:
          break;
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
    report_type: string;
  }) => {
    const { cust_id, upload_date_time, report_type } = values;
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
      let isTagMatch = true;

      // Check for cust_id match
      if (cust_id) {
        const custIdStr = String(cust_id).toLowerCase();
        const entryTitle = String(entry.report_name || "").toLowerCase();
        const entryEmail = String(entry.uploaded_by || "").toLowerCase();
        const getCustIdsData = customerOptions.filter((item) =>
          String(item.label).toLowerCase().includes(custIdStr)
        );
        const getCustIds = getCustIdsData.map((item) => item.cust_id);
        isCustIdMatch =
          getCustIds.join(" ").includes(entry.cust_id) ||
          entryTitle.includes(custIdStr) ||
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

      if (report_type) {
        const getCustIdsData = reportTypeOptions.filter((item) =>
          String(item.value).toLowerCase().includes(report_type)
        );
        const getCustIds = getCustIdsData.map((item) => item.value);
        isTagMatch = getCustIds.join(" ").includes(entry.report_type);
      } else isTagMatch = true;

      return isCustIdMatch && isTagMatch && isUploadDateTimeMatch;
    });

    if (
      (cust_id === "" || cust_id == undefined) &&
      (report_type === "" || report_type == undefined) &&
      !upload_date_time
    ) {
      if (dataSource.length !== totalCount) {
        setDataSource(dataSourceTemp);
      }
    } else {
      setDataSource(filtered);
    }
  };

  const tableFilterCallback = useCallback(
    (e, key) => {
      const currValue = String(e).toLowerCase();
      const tempD = dataSourceTemp;

      if (key === "cust_id" && e) {
        const getCustIdsData = customerOptions.filter((item) =>
          String(item.label).toLowerCase().includes(currValue)
        );
        const getCustIds = getCustIdsData.map((item) => item.cust_id);
        if (getCustIds.length > 0) {
          const filtered = tempD.filter((entry) => {
            return getCustIds.join(" ").includes(entry.cust_id);
          });
          setDataSource(filtered);
          return true;
        } else {
          setDataSource([]);
          return false;
        }
      }

      if (key === "subsidiary_id" && e) {
        const getCustIdsData = subsidiariesOptions.filter((item) =>
          String(item.label).toLowerCase().includes(currValue)
        );
        const getCustIds = getCustIdsData.map((item) => item.value);
        if (getCustIds.length > 0) {
          const filtered = tempD.filter((entry) => {
            return getCustIds.join(" ").includes(entry.subsidiary_id);
          });
          setDataSource(filtered);
          return true;
        } else {
          setDataSource([]);
          return false;
        }
      }

      if (key === "report_type" && e) {
        const getCustIdsData = reportTypeOptions.filter((item) =>
          String(item.value).toLowerCase().includes(currValue)
        );
        const getCustIds = getCustIdsData.map((item) => item.value);
        if (getCustIds.length > 0) {
          const filtered = tempD.filter((entry) => {
            return getCustIds.join(" ").includes(entry.report_type);
          });
          setDataSource(filtered);
          return true;
        } else {
          setDataSource([]);
          return false;
        }
      }

      const filteredVals = tempD.filter((entry) => {
        return String(entry[key]).toLowerCase().includes(currValue);
      });
      setDataSource(filteredVals);
    },
    [loadingReports, subsidiariesOptions, reportTypeOptions]
  );

  const columns: TableColumnType[] = [
    {
      title: "Upload Date",
      dataIndex: "upload_date_time",
      width: 200,
      render: (value) => {
        return (
          <div className={styles.tdFirstCell}>
            {dayjs(value).format("MM/DD/YYYY")}
          </div>
        );
      },
    },
    {
      title: "Customers",
      dataIndex: "cust_id",
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e.target.value, "cust_id")}
        />
      ),
      render: (value) => {
        return (
          <div>
            {customerOptions.find((opt) => opt.cust_id === value)?.label}
          </div>
        );
      },
    },
    {
      title: "Subsidiary",
      dataIndex: "subsidiary_id",
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e.target.value, "subsidiary_id")}
        />
      ),
      render: (value) => {
        return (
          <div>
            {subsidiariesOptions.find((opt) => opt.value === value)?.label}
          </div>
        );
      },
    },
    {
      title: "Report Name",
      dataIndex: "report_name",

      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e.target.value, "report_name")}
        />
      ),
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "Report Type",
      dataIndex: "report_type",
      width: 320,
      filterDropdown: (
        <FilterDropdown
          variant="select"
          loading={loadingOptions}
          options={reportTypeOptions}
          onChange={(e) => tableFilterCallback(e, "report_type")}
        />
      ),
      render: (value) => {
        return (
          <div>
            {reportTypeOptions.find((opt) => opt.value === value)?.label}
          </div>
        );
      },
    },

    {
      title: "Uploaded by",
      dataIndex: "uploaded_by",
      width: 200,

      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e.target.value, "uploaded_by")}
        />
      ),
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "url",
      align: "center",
      width: 240,
      render: (value, record) => (
        <div className={styles.tdIconStyle}>
          <div className={styles.reportPdfCol}>
            <Button
              style={{ border: 0, backgroundColor: "transparent" }}
              icon={<Image preview={false} src={viewDetailIcon} />}
              onClick={() => onOpenPDFReportPreview(value)}
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
              style={{ border: 0, backgroundColor: "transparent" }}
              icon={<Image preview={false} src={downloadIcon} />}
              onClick={() => onDownloadPDFReport(value)}
            />
            <Divider
              style={{
                borderColor: "#667075",
                borderWidth: 2,
                marginInline: 0,
              }}
              type="vertical"
            />
            <Popconfirm
              title="Delete a report"
              description="Are you sure to delete this report?"
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(record as Report)}
            >
              <Button
                shape="circle"
                style={{ border: 0, backgroundColor: "transparent" }}
                icon={<Image preview={false} src={deleteIcon} />}
              />
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const pageSize = 6; // Number of cards per page

  // Get current page <data>
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = dataSource.slice(startIndex, startIndex + pageSize);

  const date = dayjs(new Date().toISOString().split("T")[0]).format(
    "MM/DD/YYYY"
  );

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
        <Text className={styles.title}>Reports</Text>
        <Button
          className={styles.createReportBtn}
          disabled={loadingReports}
          onClick={() => setOpenCreateReportModal(true)}
        >
          <Text className={styles.createBtn}>+ Create a Report</Text>
        </Button>
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
                  className={styles.searchBar}
                  size="large"
                  placeholder=" Enter customer or report name or email"
                  prefix={<SearchOutlined />}
                  onChange={(e) => {
                    form.setFieldValue("cust_id", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={3}>
              <Form.Item
                name="upload_date_time"
                initialValue="Till Today"
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Title className={styles.fieldTitle}>Date</Title>
                <Select
                  className={styles.selectBar}
                  defaultValue="Till Today"
                  placeholder="Till Today"
                  options={date_options}
                  onChange={(value) =>
                    form.setFieldValue("upload_date_time", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={3}>
              <Form.Item
                name="report_type"
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Title className={styles.fieldTitle}>Report Type</Title>
                <Select
                  className={styles.selectBar}
                  defaultValue="Select"
                  placeholder="Select"
                  options={reportTypeOptions}
                  onChange={(value) => form.setFieldValue("report_type", value)}
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Button
                htmlType="submit"
                className={styles.searchBtn}
                disabled={loadingReports}
              >
                <Text className={styles.createBtn}>Search</Text>
              </Button>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Button
                onClick={resetClearForm}
                className={styles.clearBtn}
                disabled={loadingReports}
              >
                <Text className={styles.createBtn}>Clear</Text>
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className={styles.OptionContainer} gutter={32}>
          <Col flex={5}>
            <Title className={styles.optionTitle}>
              List of Reports ({dataSource.length})
            </Title>
          </Col>
          <Col flex={1}>
            <Row>
              <Col className={styles.sortContainer} flex={4}>
                <Title className={styles.sortTitle}>Sort:</Title>
                <Select
                  defaultValue="Date"
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
                      "omega-admin-report-page-view",
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
                className={styles.reportsTable}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? styles.tdStyleOdd : styles.tdStyleEven
                }
                rowKey="report_id"
                bordered={false}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                  total: dataSource.length,
                  position: ["bottomCenter"],
                  defaultPageSize: 5,
                  itemRender: (page, type, originalElement) => {
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
                loading={loadingReports}
                onChange={onTableChange}
              />
            </div>
          ) : (
            <div className={styles.content}>
              <Row gutter={[24, 24]} justify="start">
                {currentData.map((report, index) => (
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
                              new Date(report.upload_date_time)
                                .toISOString()
                                .split("T")[0]
                            ).format("MM/DD/YYYY")}
                          </Text>
                        </Col>
                        <Col>
                          <Space>
                            <Button
                              icon={
                                <Image
                                  preview={false}
                                  style={{ backgroundColor: "transparent" }}
                                  src={viewDetailIcon}
                                />
                              }
                              type="link"
                              style={{ color: "#fff" }}
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
                                <Image
                                  preview={false}
                                  style={{ backgroundColor: "transparent" }}
                                  src={downloadIcon}
                                />
                              }
                              type="link"
                              style={{ color: "#fff" }}
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
                                <Image
                                  style={{ backgroundColor: "transparent" }}
                                  preview={false}
                                  src={deleteIcon}
                                />
                              }
                              type="link"
                              danger
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
                        <Col xs={24} sm={24}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Customers</Text>
                            <p className={styles.value}>
                              {
                                customerOptions.find(
                                  (opt) => opt.cust_id === report.cust_id
                                )?.label
                              }
                            </p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Subsidiary</Text>
                            <p className={styles.value}>
                              {
                                subsidiariesOptions.find(
                                  (opt) => opt.value === report.subsidiary_id
                                )?.label
                              }
                            </p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Report Name</Text>
                            <p className={styles.value}>{report.report_name}</p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Report Type</Text>
                            <p className={styles.value}>
                              {
                                reportTypeOptions.find(
                                  (opt) => opt.value === report.report_type
                                )?.label
                              }
                            </p>
                          </Space>
                        </Col>
                        <Col>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Uploaded by</Text>
                            <p className={styles.value}>{report.uploaded_by}</p>
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

      {/* Show the reports data with cards */}

      {/* Create Report Modal */}
      <Modal
        className={styles.createReportModal}
        open={openCreateReportModal}
        onCancel={onCloseCreateReportModal}
        footer={null}
        title={<Text type="secondary">NEW REPORT</Text>}
      >
        <Form
          {...formLayout}
          className={styles.createReportForm}
          form={form}
          requiredMark={false}
          name="create-report"
          onFinish={onSubmitCreateReportForm}
        >
          <Title className={styles.formTitle}>Create a Report</Title>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="report_name"
                label={
                  <span>
                    Report Name<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Report Name is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="report_type"
                label={
                  <span>
                    Report Type<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Report Type is required!" },
                ]}
              >
                <Select
                  options={reportTypeOptions}
                  placeholder="Select"
                  defaultValue=""
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="cust_id"
                label={
                  <span>
                    Customer<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[{ required: true, message: "Customer is required!" }]}
              >
                <Select
                  options={customerOptions}
                  defaultValue=""
                  onChange={onChangeReportCustomer}
                  placeholder="Select"
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          {filteredSubsidiariesOptions.length > 0 && (
            <Row gutter={30}>
              <Col sm={24}>
                <Form.Item name="subsidiary_id" label="Subsidiary">
                  <Select
                    options={filteredSubsidiariesOptions}
                    showSearch
                    allowClear
                    // disabled={!currentCustomerOption}
                    disabled={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="url"
                label={
                  <span>
                    Report File<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Report File is required!" },
                ]}
              >
                <Dragger
                  className={styles.reportFileDragger}
                  multiple={false}
                  name="file"
                  maxCount={1}
                  accept=".pdf,.doc,.docx,.csv"
                  customRequest={onCustomRequest}
                  // disabled={!currentCustomerOption}
                >
                  <p
                    className="ant-upload-text"
                    style={{
                      color: "#498dce",
                      marginBottom: 15,
                      fontSize: "10px !important",
                    }}
                  >
                    Drag and drop your file here or click to browse
                  </p>
                  <p className="ant-upload-drag-icon">
                    <Image preview={false} src={FileUploadIcon} />
                  </p>
                  <p
                    className="ant-upload-hint"
                    style={{
                      color: "#8E8E8E",
                      marginBottom: 15,
                      fontFamily: "Poppins-Regular",
                      fontSize: "10px !important",
                    }}
                  >
                    Support file type: .pdf / .docx / .csv
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.formActions}>
            <Button
              htmlType="button"
              size="large"
              className={styles.clearBtn}
              onClick={onResetCreateReportForm}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#498dce" }}
              htmlType="submit"
              size="large"
              loading={creatingReport}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Pdf Preview Modal */}
      <Modal
        className={`${styles.pdfPreviewModal} pdfViewerV2Button`}
        open={openPdfPreviewModal}
        onCancel={() => setOpenPdfPreviewModal(false)}
        footer={null}
      >
        <PdfViewerV2 file={pdfUrl} />
      </Modal>
    </div>
  );
};

export { AdminReports };
