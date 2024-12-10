export type trendType = {
  articleCount: string;
  graphURL: string;
};

export interface FilterVulnerability {
  cve_id: string;
  description: string;
  vendor: AIType;
  product: AIType;
  cvss_score: number;
  cvss_estimate: number;
  epss_score: string;
  trend: trendType;
  graphUrl: string;
  published: number;
  patched: number;
  exploit: string;
}
export interface Vulnerability {
  cve_id: string;
  description: string;
  vendor: AIType;
  product: AIType;
  cvss_score: number;
  cvss_estimate: number;
  epss_score: string;
  trend: trendType;
  graphUrl: string;
  published: number;
  patched: number;
  exploit: string;
}

export interface AIType {
  array: (object | undefined)[];
  status: boolean;
}
