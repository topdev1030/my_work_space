import type { Theme } from "../types";

const colors: Theme["colors"] = {
  colorPrimaryBg: "#001529",
  colorPrimaryBgHover: "#112545",
  colorPrimaryBorder: "#15325b",
  colorPrimaryBorderHover: "#15417e",
  colorPrimaryHover: "#3c89e8",
  colorPrimary: "#1668dc",
  colorPrimaryActive: "#1554ad",
  colorPrimaryTextHover: "#3c89e8",
  colorPrimaryText: "#1668dc",
  colorPrimaryTextActive: "#1554ad",
  colorSuccessBg: "#162312",
  colorSuccessBgHover: "#1d3712",
  colorSuccessBorder: "#274916",
  colorSuccessBorderHover: "#306317",
  colorSuccessHover: "#306317",
  colorSuccess: "#49aa19",
  colorSuccessActive: "#3c8618",
  colorSuccessTextHover: "#6abe39",
  colorSuccessText: "#49aa19",
  colorSuccessTextActive: "#3c8618",
  colorWarningBg: "#2b2111",
  colorWarningBgHover: "#443111",
  colorWarningBorder: "#594214",
  colorWarningBorderHover: "#7c5914",
  colorWarningHover: "#7c5914",
  colorWarning: "#d89614",
  colorWarningActive: "#aa7714",
  colorWarningTextHover: "#e8b339",
  colorWarningText: "#d89614",
  colorWarningTextActive: "#aa7714",
  colorErrorBg: "#2c1618",
  colorErrorBgHover: "#451d1f",
  colorErrorBorder: "#5b2526",
  colorErrorBorderHover: "#7e2e2f",
  colorErrorHover: "#e86e6b",
  colorError: "#dc4446",
  colorErrorActive: "#ad393a",
  colorErrorTextHover: "#e86e6b",
  colorErrorText: "#dc4446",
  colorErrorTextActive: "#ad393a",
  colorInfoBg: "#111a2c",
  colorInfoBgHover: "#112545",
  colorInfoBorder: "#15325b",
  colorInfoBorderHover: "#15417e",
  colorInfoHover: "#15417e",
  colorInfo: "#1668dc",
  colorInfoActive: "#1554ad",
  colorInfoTextHover: "#3c89e8",
  colorInfoText: "#1668dc",
  colorInfoTextActive: "#1554ad",
  colorText: "rgba(255, 255, 255, 0.85)",
  colorTextSecondary: "rgba(255, 255, 255, 0.65)",
  colorTextTertiary: "rgba(255, 255, 255, 0.45)",
  colorTextQuaternary: "rgba(255, 255, 255, 0.25)",
  colorTextPlaceholder: "#404e5e",
  colorBorder: "#424242",
  colorBorderSecondary: "#303030",
  colorFill: "rgba(255, 255, 255, 0.18)",
  colorFillSecondary: "rgba(255, 255, 255, 0.12)",
  colorFillTertiary: "rgba(255, 255, 255, 0.08)",
  colorFillQuaternary: "rgba(255, 255, 255, 0.04)",
  colorBgContainer: "#001529",
  colorBgElevated: "#0a1e32",
  colorBgLayout: "#001529",
  colorBgSpotlight: "#424242",
  colorBgMask: "rgba(0, 0, 0, 0.45)",
  colorBrandWhite: "#ffffff",
  colorBrandBlack: "#000000",
  colorBrandBlack100: "#131A14",
  colorBrandBlue100: "#0062A5",
  colorBrandBlue200: "#498DCE",
  colorBrandRed100: "#f44336",
  colorBrandRed200: "#ff5722",
  colorBrandYellow100: "#ffee55",
  colorBrandYellow200: "#ff9800",
  colorBrandGray100: "#404e5e",
  colorTextGray: "#6B6B6B",
};

export type ColorName = keyof Theme["colors"];

export { colors };
