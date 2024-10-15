import { useEffect, useRef } from "react";
import { select, line, scaleLinear, scaleUtc, extent } from "d3";
import useMeasure from "react-use-measure";

export const LineChart = ({
    data
}: {
    data: { date: string; value: number }[];
}) => {
    const [ref, bounds] = useMeasure();

    return (
        <figure
            className="aspect-[785_/_595] min-h-[460px] w-full md:aspect-[640_/_240]"
            ref={ref}
        >
            {bounds.width > 0 ? (
                <Chart
                    data={data}
                    width={bounds.width}
                    height={bounds.height}
                />
            ) : null}
        </figure>
    );
};

const Chart = ({
    data,
    width,
    height
}: {
    data: { date: string; value: number }[];
    width: number;
    height: number;
}) => {
    const chartRef = useRef<SVGSVGElement>(null);

    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 40
    };

    const xExtent = extent(data.map(d => new Date(d.date)));
    const yExtent = extent(data.map(d => d.value));

    console.log("xExtent", xExtent);

    const xScale = scaleUtc()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);
    const yScale = scaleLinear()
        .domain([yExtent[0], yExtent[1] > 0 ? yExtent[1] : 10])
        .range([height - margin.bottom, margin.top]);

    const lineChart = line<(typeof data)[number]>()
        .x(data => xScale(new Date(data.date)))
        .y(data => yScale(data.value));

    const d = lineChart(data);

    useEffect(() => {
        const chart = select(chartRef.current);

        chart
            .select(".xAxis")
            .attr("x1", margin.left)
            .attr("y1", margin.top)
            .attr("x2", margin.left)
            .attr("y2", height - margin.bottom)
            .attr("fill", "none")
            .attr("stroke", "currentColor")
            .attr("stroke-width", "0.5");

        chart
            .select(".yAxis ")
            .attr("x1", margin.left)
            .attr("y1", height - margin.bottom)
            .attr("x2", width - margin.right)
            .attr("y2", height - margin.bottom)
            .attr("fill", "none")
            .attr("stroke", "currentColor")
            .attr("stroke-width", "0.5");
    }, [height, width]);

    return (
        <svg
            width={Math.round(width)}
            height={Math.round(height)}
            viewBox={`0 0 ${Math.round(width)} ${Math.round(height)}`}
            ref={chartRef}
        >
            <path
                d={d}
                fill="none"
                stroke="#FF8551"
                strokeWidth="5"
            />

            <line className="xAxis" />
            <line className="yAxis" />

            {xScale
                .ticks(data.length)
                // .tickFormat(timeFormat("%b %Y"))
                // .slice(1)
                // .map(xScale.tickFormat(timeDay.every(1), timeFormat("%b %Y")))
                .map((tick, i) => (
                    // <g
                    //     key={i}
                    //     transform={`translate(${Math.round(xScale(tick))}, 0)`}
                    // >
                    <line
                        key={i}
                        // x1={0}
                        x1={Math.round(xScale(tick))}
                        y1={margin.top}
                        // x2={0}
                        x2={Math.round(xScale(tick))}
                        y2={Math.round(height - margin.bottom)}
                        stroke="currentColor"
                        strokeWidth="0.25"
                        opacity="0.7"
                    />
                    // <text
                    //     // x={`${xScale(tick)}`}
                    //     x="0"
                    //     y={height}
                    //     fill="currentColor"
                    //     textAnchor={i === 0 ? "start" : "middle"}
                    //     className="font-primary text-xs-base-xs-lg"
                    // >
                    //     {new Intl.DateTimeFormat(undefined, {
                    //         month: "2-digit",
                    //         day: "2-digit"
                    //     }).format(tick)}
                    // </text>
                    // </g>
                ))}

            {yScale.ticks(5).map((tick, i) => (
                <g
                    key={i}
                    transform={`translate(0, ${Math.round(yScale(tick))})`}
                >
                    <line
                        x1={margin.left}
                        x2={Math.round(width - margin.right)}
                        stroke="currentColor"
                        strokeWidth="0.25"
                        opacity="0.7"
                    />
                    <text
                        // y={-5}
                        x={30}
                        fill="currentColor"
                        alignmentBaseline="middle"
                        textAnchor="end"
                        className="font-primary text-xs-base-xs-lg"
                    >
                        {tick}
                    </text>
                </g>
            ))}
        </svg>
    );
};
