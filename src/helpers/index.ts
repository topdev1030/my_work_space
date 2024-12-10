import axios from "axios";
import FileSaver from "file-saver";

import moment from "moment";

// config
import config from "@/config";

// types
import { USER_ROLE } from "@/types";

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const { data } = await axios.get(url, { responseType: "blob" });
    FileSaver.saveAs(data, fileName);
  } catch (error) {
    console.log(error);
  }
};

export const getStorgeHostUrl = (): string => {
  return `https://${config.azure.storageAccountName}.blob.core.windows.net`;
};

export const getUserRole = (orgId: string): USER_ROLE => {
  if (orgId === config.auth0.adminOrgId) return USER_ROLE.ADMIN;
  return USER_ROLE.CUSTOMER;
};

export const toNumberWithSign = (value: number): string => {
  if (value > 0) return `+${value}`;
  return value.toString();
};

export const convertESTDateFormat = (value: any): string => {
  return moment(value).format("MM/DD/YYYY");
};

// Hex alpha color
export const interpolateColor = (score: any) => {
  const lowColor = "#F7FF5F";
  const highColor = "#FF7B23";
  const minScore = 5.3;
  const maxScore = 10.0;

  if (score < 5.3) return "#F7FF5F";

  const lowRGB = {
    r: parseInt(lowColor.substr(1, 2), 16),
    g: parseInt(lowColor.substr(3, 2), 16),
    b: parseInt(lowColor.substr(5, 2), 16),
  };

  const highRGB = {
    r: parseInt(highColor.substr(1, 2), 16),
    g: parseInt(highColor.substr(3, 2), 16),
    b: parseInt(highColor.substr(5, 2), 16),
  };

  // Calculate ratio based on score
  const ratio = (score - minScore) / (maxScore - minScore);

  // Linearly interpolate each channel
  const interpolate = (lowVal: number, highVal: number) =>
    Math.round(lowVal + (highVal - lowVal) * ratio);

  const interpolatedRGB = {
    r: interpolate(lowRGB.r, highRGB.r),
    g: interpolate(lowRGB.g, highRGB.g),
    b: interpolate(lowRGB.b, highRGB.b),
  };

  // Convert back to hex string
  const toHex = (value) => value.toString(16).padStart(2, "0");

  return `#${toHex(interpolatedRGB.r)}${toHex(interpolatedRGB.g)}${toHex(
    interpolatedRGB.b
  )}`;
};

// trimes all spaces of specified string
export function removeSpacesUsingSplit(input: string): string {
  return input.split(" ").join("");
}
