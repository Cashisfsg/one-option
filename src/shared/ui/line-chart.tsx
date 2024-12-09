import { useEffect, useRef } from "react";
import { select, line, scaleLinear, scaleUtc, extent } from "d3";
import useMeasure from "react-use-measure";
import { cnBase } from "tailwind-variants";

type Data = { data: (string | number)[] };

interface Options {
    xAxis: Data;
    yAxis: (Data & { color?: string })[];
}

interface LineChartProps extends React.ComponentPropsWithoutRef<"figure"> {
    options: Options;
}

export const LineChart: React.FC<LineChartProps> = ({
    className,
    options,
    ...props
}) => {
    const [ref, bounds] = useMeasure();

    return (
        <figure
            className={cnBase(
                "aspect-[785_/_595] min-h-[460px] w-full md:aspect-[640_/_240]",
                className
            )}
            ref={ref}
            {...props}
        >
            {bounds.width > 0 ? (
                <Chart
                    xAxis={options.xAxis}
                    yAxis={options.yAxis}
                    width={bounds.width}
                    height={bounds.height}
                />
            ) : null}
        </figure>
    );
};

const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
};

const Chart = ({
    xAxis,
    yAxis,
    width,
    height
}: {
    xAxis: Data;
    yAxis: (Data & { color?: string })[];
    width: number;
    height: number;
}) => {
    const chartRef = useRef<SVGSVGElement>(null);

    const xExtent = extent(xAxis.data.map(value => new Date(value)));
    const yExtent = extent(yAxis.flatMap(d => d.data));

    const xScale = scaleUtc()
        .domain(xExtent)
        .range([margin.left, width - margin.right]);
    const yScale = scaleLinear()
        .domain([yExtent[0], yExtent[1] > 0 ? yExtent[1] : 10])
        .range([height - margin.bottom, margin.top]);

    const lineChart = line<(typeof yAxis)[number]>()
        .x((_, i) => xScale(new Date(xAxis.data[i])))
        .y(data => yScale(data));

    // const d = lineChart(data);

    const dArray = yAxis.map(yValue => {
        return lineChart(yValue.data);
    });

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
            {dArray.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke={yAxis[i]?.color || "currentColor"}
                    strokeWidth="5"
                />
            ))}

            <line className="xAxis" />
            <line className="yAxis" />

            {xScale
                .ticks(xAxis.data.length)
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
