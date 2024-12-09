export type WEEKLY_STATS = {
  chatter: "low" | "high";
  thirdAlerts: number;
  breachAlerts: number;
  malwareFamilies: number;
  malwareFamiliesMargin: number;
};

export interface chartData {
  total: number;
  weaponized: number;
  exploited: number;
}

export type pieData = {
  vendorsData: Array<object>;
  weaponizedData: Array<object>;
  exploitedData: Array<object>;
};

export type filterOptions = {
  count: number;
  layers: Array<any>;
  sort: object;
  type: string;
};
