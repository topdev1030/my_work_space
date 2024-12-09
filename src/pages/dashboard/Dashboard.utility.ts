export const convertParameter = (data: string | undefined) => {
  let parameterField: string | undefined;

  switch (data) {
    case "Trending":
      parameterField = "trending";
      break;
    case "New":
      parameterField = "created";
      break;
    case "Patched":
      parameterField = "patched";
      break;
    case "Exploited":
      parameterField = "exploited";
      break;
    case "Proof of Concept":
      parameterField = "poc";
      break;
    case "Weaponized":
      parameterField = "weaponized";
      break;
    case "CISA KEV":
      parameterField = "inCisaKev";
      break;
    default:
      parameterField = ""; // Default value if no case is matched
      break;
  }

  return parameterField;
};
