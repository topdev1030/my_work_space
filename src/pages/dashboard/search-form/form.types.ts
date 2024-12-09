export interface IFilterOptionItem {
  icon?: any;
  label: string;
  value: string;
}

export interface OptionProps {
  value: string;
  children?: React.ReactNode;
}

export type searchFormValues = {
  dateRange: string;
  parameter: string | undefined;
};
