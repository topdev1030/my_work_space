import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import {
  Form,
  Row,
  Col,
  message,
  Select,
  Divider,
  Image,
  Space,
  Card,
  PaginationProps,
  Pagination as CardPagination,
} from "antd";
import type { TablePaginationConfig } from "antd/es/table/interface";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";

// components
import {
  Button,
  Input,
  Modal,
  Table,
  FilterDropdown,
  Popconfirm,
  Typography,
} from "@/components";
import type { TableColumnType } from "@/components";

// services
import {
  AllMessagesFilters,
  CreateMessagePayload,
  messagesService,
} from "@/services";

// Import TransitionGroup for animation
import { TransitionGroup, CSSTransition } from "react-transition-group";

// Icon Import
import deleteIcon from "../../../static/images/deleteIcon.png";
import sendIcon from "../../../static/images/sendIcon.png";
import viewCardIcon from "../../../static/images/view_expand.png";
import viewIcon from "../../../static/images/view.png";

// redux
import { useAppSelector } from "@/redux";
import { selectAccessToken } from "@/redux/auth";

// types
import { Option, Pagination, Message } from "@/types";
import { CreateMessageFormValues, CustomerOption } from "./Messages.types";

// constants
import { DEFAULT_PAGE_SIZE } from "@/components/atoms/table";
import { DEBOUNCE_WAIT, formLayout } from "./Messages.constants";

// styles
import { mgmtServices } from "@/services/Mgmt/MgmtServices";
import { useStyles } from "./Messages.styles";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const AdminMessages: React.FC = () => {
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

  const sort_message_options = [
    {
      key: "date",
      value: "Date",
    },
    {
      key: "subject",
      value: "Subject",
    },
    {
      key: "customer_name",
      value: "Customer Name",
    },
  ];

  const [isTableView, setIsTableView] = useState<boolean>(true);

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [filters, setFilters] = useState<AllMessagesFilters>({});
  const [customFilers, setCustomFilters] = useState<object>({});
  const [pagination, setPagination] = useState<Pagination>({
    offset: 0,
    limit: DEFAULT_PAGE_SIZE,
  });
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [creatingMessage, setCreatingMessage] = useState<boolean>(false);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Message[]>([]);
  const [dataSourceTemp, setDataSourceTemp] = useState<Message[]>([]);
  const [totalCountPerSearch, setTotalCountPerSearch] = useState<number>(0);

  const [totalCount, setTotalCount] = useState<number>(0);
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);
  const [tags, setTags] = useState<object[]>([]);
  const [customerTypeOptions, setCustomerTypeOptions] = useState<
    Array<Option & { id?: string }>
  >([]);
  const [openCreateMessageModal, setOpenCreateMessageModal] =
    useState<boolean>(false);

  const [form] = Form.useForm();

  const accessToken = useAppSelector(selectAccessToken);

  const styles = useStyles();

  useEffect(() => {
    setIsTableView(
      localStorage.getItem("omega-admin-messages-page-view") === "false"
        ? false
        : true
    );
  }, []);

  const onTableChange = ({ current, pageSize }: TablePaginationConfig) => {
    if (current && pageSize) {
      setPagination({
        offset: (current - 1) * pageSize,
        limit: pageSize,
      });
    }
  };

  const onResetCreateMessageForm = () => {
    setOpenCreateMessageModal(false);
    form.resetFields();
  };

  const onCloseCreateMessageModal = () => {
    setOpenCreateMessageModal(false);
    form.resetFields();
  };

  const fetchOptions = async () => {
    setLoadingOptions(true);
    try {
      const token = await mgmtServices.getMgmtToken();
      const access = token?.access_token;
      if (access) {
        const organizational = await mgmtServices.getOrganizational(access);
        // Map the organizational data to customer type options
        const newOrganizationalOptions = organizational.map(
          ({ display_name, name, id }) => ({
            id,
            label: display_name,
            value: name,
          })
        );

        // Set customer type options
        setCustomerTypeOptions(newOrganizationalOptions);
      } else {
        console.error("Access token not found in the response");
      }
    } catch (error) {
      console.log("Error from getOrganizations:", error);
    } finally {
      setLoadingOptions(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchOptions();
    }
  }, [accessToken]);

  const getAllMessages = async () => {
    setLoadingMessages(true);
    try {
      const { alerts, metadata } = await messagesService.getAllMessages({
        token: accessToken,
        offset: 0,
        limit: -1,
        filters: filters,
      });
      setDataSource(alerts);
      setDataSourceTemp(alerts);
      setTotalCount(metadata.total);
      setTotalCountPerSearch(metadata.total);
      const tagggs = alerts.map((item) => item.tags[0]);
      const uniqueArray = tagggs
        .filter((item, index) => {
          return (
            tagggs.findIndex(
              (tag) => tag.toLowerCase() === item.toLowerCase()
            ) === index
          );
        })
        .map((item, index) => ({
          key: index,
          value: item,
        }));
      setTags(uniqueArray as []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getAllMessages();
    }
  }, [accessToken, customerOptions]);

  const onDelete = async ({ notification_id }: Message) => {
    try {
      // delete message & reload table
      await messagesService.deleteMessage({
        message_id: notification_id,
        token: accessToken,
      });
      await getAllMessages();

      // notify message
      message.success("A message was deleted successfully.");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete a message, try again later.");
    }
  };

  const onResend = async ({ notification_id }: Message) => {
    try {
      const response = await messagesService.resendMessage({
        message_id: notification_id,
        token: accessToken,
      });

      await getAllMessages();
      // notify message
      message.success("A message was resent successfully.");

      const resentMessageId = response.id;
      if (resentMessageId) {
        setHighlightedRow(resentMessageId);
        setTimeout(() => setHighlightedRow(null), 3000);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to resend a message, try again later.");
    }
  };

  const onSubmitAlert = async (values: CreateMessageFormValues) => {
    setCreatingMessage(true);

    const cust_ids: string[] = [];

    if (values?.select_customer && values.select_customer.length > 0) {
      (values.select_customer as unknown as string[]).forEach(
        (select_customer) => {
          const orgId = customerTypeOptions.find(
            (item) => item.value === select_customer
          )?.id;
          if (orgId) cust_ids.push(orgId);
        }
      );
    }
    const currentDate = new Date();
    const currentMonthPlusOne = currentDate.getMonth() + 1;
    const datetime = `${currentDate.getDate()}/${currentMonthPlusOne}/${currentDate.getFullYear()} @ ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    // Step 1: Parse the input date string
    const [datePart, timePart] = datetime.split(" @ ");

    if (!datePart || !timePart) return;

    const tags: string[] = [];

    if (values?.message_tags && values.message_tags.length > 0) {
      if (typeof values.message_tags === "object") {
        tags.push(values.message_tags);
      } else tags.push(...[values.message_tags]);
    }

    try {
      const dataToSave = {
        tags,
        cust_ids,
        title: values?.message_title,
        subject: values?.message_subject,
        description: values?.message_descriptions,
        recommendations: values?.message_recomendations,
      };
      await messagesService.sendMessage({
        ...dataToSave,
        token: accessToken,
      } as unknown as CreateMessagePayload);
      await getAllMessages();

      // reset form & close modal
      form.resetFields();
      setOpenCreateMessageModal(false);
      setCreatingMessage(false);

      message.success("Message sent successfully.");
    } catch (error) {
      console.log(error);
      message.error(
        "The user associated with this organization is not registered on the app."
      );
    } finally {
      setCreatingMessage(false);
    }
  };

  const handleSortChange = (value) => {
    const sorted = [...dataSource].sort((a, b) => {
      switch (value) {
        case "Customer Name":
          return a.cust_id.localeCompare(b.cust_id);
          break;
        case "Date":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          break;
        case "Subject":
          return a.subject.localeCompare(b.subject);
          break;
        default:
          return a.cust_id.localeCompare(b.cust_id);
          break;
      }
    });
    setDataSource(sorted);
    setTotalCountPerSearch(Number(sorted.length));
  };

  const resetClearForm = () => {
    form.resetFields();
    if (dataSource.length !== totalCount) {
      setDataSource(dataSourceTemp);
      setTotalCountPerSearch(Number(dataSourceTemp.length));
    }
  };

  const handleSearch = async (values: {
    cust_id: string;
    upload_date_time: string;
    tag: string;
  }) => {
    const { cust_id, upload_date_time, tag } = values;
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
        const entryCustId = String(entry.cust_id || "").toLowerCase();
        const entryTitle = String(entry.title || "").toLowerCase();
        const custIdStr = String(cust_id).toLowerCase();

        isCustIdMatch =
          entryCustId.includes(custIdStr) || entryTitle.includes(custIdStr);
      } else isCustIdMatch = true;

      // Check for upload_date_time match
      if (upload_date_time) {
        if (upload_date_time !== "Till Today") {
          const entryDate = moment(entry.created_at);
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

      // Check for tag match
      if (tag) {
        const tagsStr = Array.isArray(entry.tags)
          ? entry.tags.join(" ").toLowerCase()
          : String(entry.tags || "").toLowerCase();

        isTagMatch = tagsStr.includes(tag.toLowerCase());
      } else isTagMatch = true;

      return isCustIdMatch && isTagMatch && isUploadDateTimeMatch;
    });

    if (
      (cust_id === "" || cust_id == undefined) &&
      (tag === "" || tag == undefined) &&
      !upload_date_time
    ) {
      if (dataSource.length !== totalCount) {
        setDataSource(dataSourceTemp);
        setTotalCountPerSearch(Number(dataSourceTemp.length));
      }
    } else {
      setDataSource(filtered);
      setTotalCountPerSearch(Number(filtered.length));
    }
  };

  const tableFilterCallback = useCallback(
    (e, key) => {
      const currValue = e.target.value;
      const tempD = dataSource;
      setCustomFilters((prev) => ({ ...prev, [key]: [currValue] }));
      const filteredVals = tempD.filter((entry) => {
        return String(entry[key])
          .toLowerCase()
          .includes(String(currValue).toLowerCase());
      });
      setDataSource(filteredVals);
      setTotalCountPerSearch(Number(filteredVals.length));
    },
    [loadingMessages]
  );

  const columns: TableColumnType[] = [
    {
      width: 150,
      title: "Upload Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => dayjs(value).format("MM/DD/YYYY"),
    },
    {
      title: "Customers",
      width: 200,
      dataIndex: "cust_id",
      filterIcon: <FilterOutlined />,
      filterSearch: true,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "cust_id")}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      filterIcon: <FilterOutlined />,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "title")}
        />
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      filterIcon: <FilterOutlined />,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "subject")}
        />
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      filterIcon: <FilterOutlined />,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "tags")}
        />
      ),
    },
    {
      title: "Recommendations",
      dataIndex: "recommendations",
      filterIcon: <FilterOutlined />,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "recommendations")}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => {
        if (text && text.length > 25) return `${text.slice(0, 25)}…`;
        return text;
      },
      filterIcon: <FilterOutlined />,
      filterDropdown: (
        <FilterDropdown
          variant="input"
          onChange={(e) => tableFilterCallback(e, "description")}
        />
      ),
    },
    {
      width: 140,
      title: "Action",
      align: "center",
      render: (_, messageData) => (
        <div className={styles.tdIconStyle}>
          <div className={styles.messagePdfCol}>
            <Popconfirm
              title="Resend a message"
              description="Are you sure to resend this message?"
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onResend(messageData as Message)}
            >
              <Button
                shape="circle"
                style={{ border: 0, backgroundColor: "transparent" }}
                icon={<Image preview={false} src={sendIcon} />}
              />
            </Popconfirm>
            <Divider
              style={{
                borderColor: "#667075",
                borderWidth: 2,
                marginInline: 0,
              }}
              type="vertical"
            />
            <Popconfirm
              title="Delete a message"
              description="Are you sure to delete this message?"
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(messageData as Message)}
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
        <Text className={styles.title}>Messages</Text>
        <Button
          className={styles.createMessageBtn}
          disabled={loadingMessages}
          // onClick={() => sendMessageToAllUsers()}
          onClick={() => setOpenCreateMessageModal(true)}
        >
          <Text className={styles.createBtn}>Send a Message</Text>
        </Button>
      </div>
      <div className={styles.searchContainer}>
        <Form form={form} onFinish={handleSearch}>
          <Title className={styles.panelTitle}>Search Panel</Title>
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
                  placeholder=" Enter customer or title"
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
                name="tag"
                initialValue=""
                style={{ width: "100%", marginBottom: 0 }}
              >
                <Title className={styles.fieldTitle}>Tags</Title>
                <Select
                  className={styles.selectBar}
                  defaultValue="Select"
                  placeholder="Select"
                  options={tags}
                  onChange={(value) => form.setFieldValue("tag", value)}
                />
              </Form.Item>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Button
                htmlType="submit"
                className={styles.searchBtn}
                disabled={loadingMessages}
              >
                <Text className={styles.createBtn}>Search</Text>
              </Button>
            </Col>
            <Col className={styles.fieldContainer} flex={2}>
              <Button
                onClick={resetClearForm}
                className={styles.clearBtn}
                disabled={loadingMessages}
              >
                <Text className={styles.createBtn}>Clear</Text>
              </Button>
            </Col>
          </Row>
        </Form>
        <Row className={styles.OptionContainer} gutter={32}>
          <Col flex={5}>
            <Title className={styles.optionTitle}>
              List of Messages ({totalCountPerSearch})
            </Title>
          </Col>
          <Col flex={1}>
            <Row>
              <Col className={styles.sortContainer} flex={4}>
                <Title className={styles.sortTitle}>Sort:</Title>
                <Select
                  className={styles.sortBar}
                  defaultValue="Date"
                  placeholder="Date"
                  options={sort_message_options}
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
                      "omega-admin-messages-page-view",
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

      {/* Show the Messages data with table */}

      <TransitionGroup>
        <CSSTransition
          key={isTableView ? "table" : "cards"}
          classNames="fade"
          timeout={500}
        >
          {isTableView ? (
            <div className={styles.content}>
              <Table
                className={styles.messagesTable}
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
                loading={loadingMessages}
                onChange={onTableChange}
              />
            </div>
          ) : (
            <div className={styles.cardContent}>
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
                          <Text className={styles.subtitle}>Upload Date</Text>
                          <br />
                          <Text className={styles.value}>
                            {dayjs(
                              new Date(item.created_at)
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
                                  src={sendIcon}
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
                            <Text className={styles.value}>{item.cust_id}</Text>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Title</Text>
                            <p className={styles.value}>{item.title}</p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Subject</Text>
                            <p className={styles.value}>{item.subject}</p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Tags</Text>
                            <p className={styles.value}>{item.tags}</p>
                          </Space>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>
                              Recommendations
                            </Text>
                            <p className={styles.value}>
                              {item.recommendations}
                            </p>
                          </Space>
                        </Col>
                        <Col xs={12} sm={12}>
                          <Space
                            direction="vertical"
                            className={styles.card_text_space}
                          >
                            <Text className={styles.subtitle}>Description</Text>
                            <p className={styles.value}>{item.description}</p>
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
        className={styles.createMessageModal}
        open={openCreateMessageModal}
        onCancel={onCloseCreateMessageModal}
        footer={null}
        title={<Text type="secondary">NEW MESSAGE</Text>}
      >
        <Form
          {...formLayout}
          className={styles.createMessageForm}
          form={form}
          name="create-message"
          requiredMark={false}
          onFinish={onSubmitAlert}
        >
          <Title className={styles.formTitle}>Send a Message</Title>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="cust_id"
                label={
                  <span>
                    Select Customer<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[{ required: true, message: "Customer is required!" }]}
              >
                <Select
                  options={customerTypeOptions}
                  defaultValue={customerTypeOptions[0]}
                  placeholder="Select"
                  showSearch
                  allowClear
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="message_title"
                label={
                  <span>
                    Message Title<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Message Title is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="message_tags"
                label={
                  <span>
                    Message Tags<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Message Tags is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="message_subject"
                label={
                  <span>
                    Message Subject<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Message Subject is required!" },
                ]}
              >
                <Input placeholder="Type in" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={30}>
            <Col sm={24}>
              <Form.Item
                name="message_recommendations"
                label={
                  <span>
                    Message Recommendation
                    <span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Message Recomendation is required!",
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
            <Col sm={24}>
              <Form.Item
                name="message_descriptions"
                label={
                  <span>
                    Message Body<span style={{ color: "red" }}> *</span>
                  </span>
                }
                rules={[
                  { required: true, message: "Message Body is required!" },
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
          <div className={styles.formActions}>
            <Button htmlType="button" onClick={onResetCreateMessageForm}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={creatingMessage}>
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export { AdminMessages };
