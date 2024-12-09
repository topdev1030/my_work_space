export type trendType = {
  articleCount: string;
  graphURL: string;
};

export interface Vulnerability {
  cve_id: string;
  description: string;
  vendor: (string | undefined)[];
  product: (object | undefined)[];
  cvss_score: number;
  cvss_estimate: number;
  epss_score: string;
  trend: trendType;
  graphUrl: string;
  published: number;
  patched: number;
  exploit: string;
}
