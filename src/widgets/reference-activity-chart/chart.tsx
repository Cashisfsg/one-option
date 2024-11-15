import { useFetchReferenceChartDataQuery } from "@/entities/reference/api";
import { Fetch } from "@/shared/ui/fetch";

import { LineChart } from "@/shared/ui/line-chart";
import React from "react";

interface ReferenceActivityChartProps {
    frequency: "daily" | "weekly" | "monthly";
}

export const ReferenceActivityChart: React.FC<ReferenceActivityChartProps> = ({
    frequency
}) => {
    return (
        <Fetch
            useQuery={useFetchReferenceChartDataQuery}
            args={{ frequency: frequency }}
            renderSuccess={data => (
                <LineChart
                    options={{
                        xAxis: { data: data.map(d => d?.date) },
                        yAxis: [
                            {
                                data: data.map(d => d?.clicks),
                                color: "#FF8551"
                            },
                            {
                                data: data.map(d => d?.clicks),
                                color: "#009A0F"
                            }
                        ]
                    }}
                    // data={data.map(d => ({
                    //     date: d.day || d.hour,
                    //     value: d.clicks
                    // }))}
                />
            )}
        />
    );
};
