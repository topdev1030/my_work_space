import React from "react";
import { Image, Form, Select } from "antd";
import clsx from "clsx";
// styles
import { useStyles as globalStyles } from "@/styles/global.style";
// types
import { IFilterOptionItem, OptionProps, searchFormValues } from "./form.types";
// icons
import CalendarIcon from "../../../static/images/calendar.svg";
import trendingIcon from "../../../static/images/parameter.svg";
import newIcon from "../../../static/images/new.svg";
import patchedIcon from "../../../static/images/patched.svg";
import exploitedIcon from "../../../static/images/exploited.svg";
import proofOfConceptIcon from "../../../static/images/proof_of_concept.svg";
import weaponizedIcon from "../../../static/images/weaponized.svg";
import cveIdIcon from "../../../static/images/cve_id.svg";

interface searchProps {
  params: searchFormValues;
  setParams: (data: searchFormValues) => void;
}

const date_options = [
  {
    key: "1",
    value: "Last 24 Hours",
  },
  {
    key: "2",
    value: "Last 7 Days",
  },
  {
    key: "3",
    value: "Last 1 Month",
  },
];

const searchFilter: IFilterOptionItem[] = [
  {
    icon: <Image src={trendingIcon} />,
    label: "Trending",
    value: "trending",
  },
  {
    icon: <Image src={newIcon} />,
    label: "New",
    value: "created",
  },
  {
    icon: <Image src={patchedIcon} />,
    label: "Patched",
    value: "patched",
  },
  {
    icon: <Image src={exploitedIcon} />,
    label: "Exploited",
    value: "exploited",
  },
  {
    icon: <Image src={proofOfConceptIcon} />,
    label: "Proof of Concept",
    value: "poc",
  },
  {
    icon: <Image src={weaponizedIcon} />,
    label: "Weaponized",
    value: "weaponized",
  },
  {
    icon: <Image src={cveIdIcon} />,
    label: "CISA KEV",
    value: "inCisaKev",
  },
];

const SearchForm: React.FC<searchProps> = ({ setParams, params }) => {
  // Define initial values for the form fields
  const initialValues = {
    date_range: date_options[1].value,
    parameters: searchFilter.length > 0 ? searchFilter[0].label : undefined,
  };

  const [form] = Form.useForm();
  const globalStyle = globalStyles();

  const Option: React.FC<OptionProps> = ({ children, ...props }) => (
    <optgroup {...props}>{children}</optgroup>
  );

  return (
    <div className="mt-8">
      <h1 className="mt-4 mb-6">Filters</h1>
      <Form form={form} layout="inline" initialValues={initialValues}>
        <Form.Item
          layout="vertical"
          label="Date Range"
          name="date_range"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            prefix={
              <Image
                src={CalendarIcon}
                preview={false}
                style={{ marginRight: 5 }}
              />
            }
            className={clsx(globalStyle.selectbox_field_secondary, "min-w-280")}
            options={date_options}
            onChange={(e) =>
              setParams({
                ...params,
                dateRange: e,
              })
            }
          />
        </Form.Item>
        <Form.Item
          layout="vertical"
          label="Parameter"
          name="parameters"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select
            className={clsx(globalStyle.selectbox_field_secondary, "min-w-280")}
            onChange={(e) =>
              setParams({
                ...params,
                parameter: e,
              })
            }
          >
            {searchFilter.map((item: IFilterOptionItem, index: number) => (
              <Option key={index} value={item.label}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <span style={{ marginLeft: 8 }}>{item.label}</span>
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export { SearchForm };
