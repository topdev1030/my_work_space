// types
import { WEEKLY_STATS } from "./Dashboard.types";

export const weeklyStatsData: WEEKLY_STATS = {
  chatter: "low",
  thirdAlerts: 1066,
  breachAlerts: 87,
  malwareFamilies: 251,
  malwareFamiliesMargin: -5,
};

export const initialParams = {
  dateRange: "Last 7 Days",
  parameter: "Trending",
};

export const initialOptions = (count: number) => {
  return {
    count: count,
    layers: [
      {
        filters: [
          {
            field: "period",
            value: {
              type: "Last7Days",
              label: "Last 7 Days",
            },
          },
        ],
      },
      {
        filters: [
          {
            field: "trending",
            value: true,
          },
        ],
      },
    ],
    sort: {
      field: "cveId",
      order: "desc",
    },
    type: "vulnerability",
  };
};
