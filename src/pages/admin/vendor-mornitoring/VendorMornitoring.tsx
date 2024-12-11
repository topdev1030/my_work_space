import { useState, useEffect, useCallback } from "react";
import debounce from "debounce";
import clsx from "clsx";
// import ant design
import {
  Row,
  Col,
  Image,
  message,
  Select,
  Card,
  Space,
  Form,
  Divider,
  Modal,
  Upload as VendorUpload,
  Pagination as CardPagination,
  PaginationProps,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type {
  TablePaginationConfig,
  SorterResult,
} from "antd/es/table/interface";
// components
import type { TableColumnType } from "@/components";
import { Button, Input, Table, Typography } from "@/components";
// Import TransitionGroup for animation
import { TransitionGroup, CSSTransition } from "react-transition-group";
// helpers
import { downloadFile } from "@/helpers";
// services
import { commonService, hookService } from "@/services";
// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";
// types
import type { Upload, Pagination } from "@/types";
import type { AllUploadsFilters } from "@/services/upload";
import type {
  CustomerOption,
  CreateVendorFormValues,
  VendorMornitor,
} from "./VendorMornitoring.types";
// constants
import { DEFAULT_PAGE_SIZE } from "@/components/atoms/table";
import {
  DEBOUNCE_WAIT,
  DEFAULT_SORTER,
  formLayout,
} from "./VendorMornitoring.constants";
// styles
import { useStyles } from "./VendorMornitoring.styles";
// Icon imports
import editIcon from "../../../static/images/edit.svg";
import deleteIcon from "../../../static/images/deleteIcon.png";
import viewIcon from "../../../static/images/view.png";
import viewCardIcon from "../../../static/images/view_expand.png";
import FileUploadIcon from "../../../static/images/file_upload.png";

const { Title, Text } = Typography;
const { Dragger } = VendorUpload;

const options = [
  {
    lavel: "N",
    value: "N",
  },
  {
    label: "Y",
    value: "Y",
  },
];

const objectsArray: VendorMornitor[] = Array.from(
  { length: 20 },
  (_, index) => ({
    vendor_name: "Amazon Web services Inc.",
    information_provided:
      "Identity data, Business Data, Yosemite,  PII, Active Directory Services",
    pii: "Y",
    ephi: "N",
    client_agent: "N",
    notes: "Jennifer Britland",
    newsStreamID:
      "feed%2Fhttps%3A%2F%2Ffeedly.com%2Ff%2Falert%2F9355538b-e9c7-4301-bb1e-d7da7ff3ed7a",
  })
);

const VendorMonitoring = () => {
  const [isTableView, setIsTableView] = useState<boolean>(true);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [filters, setFilters] = useState<AllUploadsFilters>({});
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: DEFAULT_PAGE_SIZE,
    sort: DEFAULT_SORTER,
  });
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [loadingVendors, setLoadingVendors] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<VendorMornitor[]>([]);
  const [dataSourceTemp, setDataSourceTemp] = useState<VendorMornitor[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openCreateVendorModal, setOpenCreateVendorModal] =
    useState<boolean>(false);
  const [creatingVendor, setCreatingVendor] = useState<boolean>(false);

  const accessToken = useAppSelector(selectAccessToken);

  const styles = useStyles();
  const [form] = Form.useForm();

  const onCloseCreateVendorModal = () => {
    setOpenCreateVendorModal(false);
    form.resetFields();
  };

  const onResetCreateVendorForm = () => {
    setOpenCreateVendorModal(false);
    form.resetFields();
  };

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

  const fetchVendors = async () => {};

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
    setIsTableView(
      localStorage.getItem("omega-admin-vendor-page-view") == "false"
        ? false
        : true
    );
  }, []);

  useEffect(() => {
    if (accessToken) {
      setDataSource(objectsArray);
      setDataSourceTemp(objectsArray);
      setTotalCount(objectsArray?.length)
    }
  }, [accessToken, customerOptions, filters, pagination]);

  const onSubmitCreateVendorForm = async (values: CreateVendorFormValues) => {
    setCreatingVendor(true);

    try {
      form.resetFields();
      setOpenCreateVendorModal(false);

      // notify message
      message.success("A new vendor was created successfully.");
    } catch (error) {
      console.log(error);
      message.error("Failed to create a vendor, try again later.");
    } finally {
      setCreatingVendor(false);
    }
  };

  const resetClearForm = () => {
    form.resetFields();
    if (dataSource.length !== totalCount) {
      setDataSource(dataSourceTemp);
    }
  };

  const columns: TableColumnType[] = [
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      width: (15 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "Information Provided",
      dataIndex: "information_provided",
      width: (25 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "PII",
      dataIndex: "pii",
      width: (5 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "ePHI",
      dataIndex: "ephi",
      width: (5 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "Client Agent",
      dataIndex: "client_agent",
      width: (10 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: (10 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "NewsStreamID",
      dataIndex: "newsStreamID",
      width: (20 * 1628) / 100,
      render: (value) => (
        <Space direction="vertical" className={clsx([styles.card_text_space])}>
          <p className={styles.value}>{value}</p>
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "url",
      align: "center",
      width: (10 * 1628) / 100,
      render: (value) => (
        <div className={styles.uploadFileCol}>
          <Button
            shape="circle"
            style={{ border: 0, backgroundColor: "transparent" }}
            icon={<Image preview={false} src={editIcon} />}
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
            icon={<Image preview={false} src={deleteIcon} />}
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

  const handleSearch = (values: {
    vendor_name: string;
    client_agent: string;
  }) => {
    const { vendor_name, client_agent } = values;
    const tempD = dataSourceTemp;
    const filtered = tempD.filter((entry) => {
      let isVendorMatch = true;
      let isClientMatch = true;

      // Check for cust_id match
      if (vendor_name) {
        const vendor_str = String(vendor_name)?.replace(/\s+/g, "")?.toLowerCase();
        const entry_vendor_name = String(entry.vendor_name || "").toLowerCase();
        isVendorMatch = entry_vendor_name?.replace(/\s+/g, "")?.includes(vendor_str) ? true : false;
      } else isVendorMatch = true;

      // Check for upload_date_time match
      if (client_agent) {
        const client_agent_str = String(client_agent).toLowerCase();
        const entry_client_agent = String(entry.client_agent || "").toLowerCase();
        isVendorMatch = entry_client_agent.includes(client_agent_str) ? true : false;
      } else {
        // No upload_date_time filter specified, all entries pass
        isClientMatch = true;
      }

      return isVendorMatch && isClientMatch;
    });

    if (!vendor_name && !client_agent) {
      if (dataSource.length !== totalCount) {
        setDataSource(dataSourceTemp);
      }
    } else {
      setDataSource(filtered);
    }
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
        <Text className={clsx([styles.title], "font-poppines")}>
          Vendor Monitoring
        </Text>
        <Button
          className={styles.createMessageBtn}
          disabled={loadingVendors}
          onClick={() => setOpenCreateVendorModal(true)}
        >
          <Text className={clsx([styles.createBtn], "font-poppines")}>
            + Add a Vendor
          </Text>
        </Button>
      </div>
      <div className={styles.searchContainer}>
        <Title className={styles.panelTitle}>Search Panel</Title>
        <Form form={form} onFinish={handleSearch}>
          <Row className={styles.searchOptionContainer} gutter={32}>
            <Col className={styles.fieldContainer} flex={4}>
              <Form.Item name="vendor_name" className="w-full mb-0">
                <Title className={styles.fieldTitle}>Search</Title>
                <Input
                  size="large"
                  placeholder="Enter vendor name"
                  className={styles.searchBar}
                  prefix={<SearchOutlined />}
                  onChange={(e) => {
                    form.setFieldValue("vendor_name", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Form.Item
                name="client_agent"
                className="w-full mb-0"
              >
                <Title className={styles.fieldTitle}>Client Agent</Title>
                <Select
                  placeholder="Select"
                  className={styles.selectBar}
                  options={options}
                  onChange={(value) =>
                    form.setFieldValue("client_agent", value)
                  }
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={1}>
              <Button
                htmlType="submit"
                className={styles.searchBtn}
                disabled={loadingVendors}
              >
                <Text className={styles.createBtn}>Search</Text>
              </Button>
            </Col>
            <Col className={styles.fieldContainer} flex={1}>
              <Button
                onClick={resetClearForm}
                className={styles.clearBtn}
                disabled={loadingVendors}
              >
                <Text className={styles.createBtn}>Clear</Text>
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className={styles.OptionContainer} gutter={32}>
          <Col flex={5}>
            <Title className={styles.optionTitle}>
              List of Vendors ({dataSource.length})
            </Title>
          </Col>
          <Col flex={1}>
            <Row className={styles.OptionContainer}>
              <Col className={styles.viewIconContainer} flex={1}>
                <Image
                  width={35}
                  height={35}
                  className={styles.viewIcon}
                  src={isTableView ? viewIcon : viewCardIcon}
                  preview={false}
                  onClick={() => {
                    localStorage.setItem(
                      "omega-admin-vendor-page-view",
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
                rowClassName={(_, index) =>
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
                loading={loadingVendors}
                onChange={onTableChange}
              />
            </div>
          ) : (
            <div style={{ marginTop: 15 }}>
              <Row justify="start" gutter={[24, 24]}>
                {currentData.map((item, index) => (
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
                          <Text className={styles.subtitle}>Vendor Name</Text>
                          <br />
                          <Text className={styles.value}>
                            {item.vendor_name}
                          </Text>
                        </Col>
                        <Col>
                          <Space>
                            <Button
                              icon={
                                <Image
                                  preview={false}
                                  style={{ backgroundColor: "transparent" }}
                                  src={editIcon}
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
                            <Text className={styles.subtitle}>
                              Information Provided
                            </Text>
                            <p className={styles.value}>
                              {item.information_provided}
                            </p>
                          </Space>
                        </Col>
                        <Col xs={12} sm={8}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>PII</Text>
                            <p className={styles.value}>{item.pii}</p>
                          </Space>
                        </Col>
                        <Col xs={12} sm={8}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>ePHI</Text>
                            <p className={styles.value}>{item.ephi}</p>
                          </Space>
                        </Col>
                        <Col xs={12} sm={8}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>
                              Client Agent
                            </Text>
                            <p className={styles.value}>{item.client_agent}</p>
                          </Space>
                        </Col>
                        <Col xs={12} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Notes</Text>
                            <p className={styles.value}>{item.notes}</p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={24}>
                          <Space
                            direction="vertical"
                            className={clsx([styles.card_text_space])}
                          >
                            <Text className={styles.subtitle}>
                              NewsStreamID
                            </Text>
                            <p className={styles.value}>{item.newsStreamID}</p>
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

      {/* send messgae modal */}
      <Modal
        className={clsx([styles.createMessageModal, "hide-scrollbar"])}
        open={openCreateVendorModal}
        onCancel={onCloseCreateVendorModal}
        footer={null}
        title={
          <Text type="secondary" className="font-regular">
            NEW VENDOR
          </Text>
        }
      >
        <Form
          {...formLayout}
          className={styles.createMessageForm}
          form={form}
          name="create-message"
          requiredMark={false}
          onFinish={onSubmitCreateVendorForm}
        >
          <Title className={clsx([styles.formTitle], "font-regular")}>
            Add a Vendor
          </Title>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="vendor_name"
                label={
                  <span className={styles.formLabel}>
                    Vendor Name<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Vendor Name is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="information_provided"
                label={
                  <span className={styles.formLabel}>
                    Information<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Information is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={8}>
              <Form.Item
                name="pii"
                label={
                  <span className={styles.formLabel}>
                    PII<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[{ required: true, message: "PII is required!" }]}
              >
                <Select
                  options={options}
                  placeholder="Select"
                  className={styles.selectBar}
                />
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item
                name="ephi"
                label={
                  <span className={styles.formLabel}>
                    ePHI<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[{ required: true, message: "ePHI is required!" }]}
              >
                <Select
                  options={options}
                  placeholder="Select"
                  className={styles.selectBar}
                />
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Form.Item
                name="client_agent"
                label={
                  <span className={styles.formLabel}>
                    Client Agent<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Client Agent is required!" },
                ]}
              >
                <Select
                  options={options}
                  placeholder="Select"
                  className={styles.selectBar}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="newsStreamID"
                label={
                  <span className={styles.formLabel}>
                    NewsStream ID<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "NewsStream ID is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="notes"
                label={
                  <span className={styles.formLabel}>
                    Notes
                    <span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Notes is required!",
                  },
                ]}
              >
                <Input
                  variant="textarea"
                  style={{ minHeight: 80, backgroundColor: "#282937" }}
                  placeholder="Type In"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24} className="flex justify-center">
              <div>
                <div className={styles.circleOR}>OR</div>
              </div>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="url"
                label={
                  <span className={styles.formLabel}>
                    Upload CSV<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Vendor File is required!" },
                ]}
              >
                <Dragger
                  className={styles.reportFileDragger}
                  multiple={false}
                  name="file"
                  maxCount={1}
                  accept=".csv"
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
                    Support file type: .CSV
                  </p>
                </Dragger>
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.formActions}>
            <Button
              htmlType="button"
              className={styles.clearBtn}
              onClick={onResetCreateVendorForm}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={creatingVendor}>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export { VendorMonitoring };
