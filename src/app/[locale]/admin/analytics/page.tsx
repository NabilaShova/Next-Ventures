import { getAnalyticsData } from "@/lib/admin/dashboard";

import { AnalyticsClient } from "./analytics-client";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData(30);
  return <AnalyticsClient data={data} />;
}
