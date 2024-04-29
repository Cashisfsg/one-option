import { useEffect, useRef } from "react";
import { select, line, scaleLinear, extent } from "d3";
import useMeasure from "react-use-measure";

export const LineChart = () => {
    const data = [
        [0, 0],
        [10, 10],
        [30, 15],
        [35, 20],
        [45, 25],
        [100, 200]
    ];

    const [ref, bounds] = useMeasure();

    return (
        <div
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
        </div>
    );
};

const Chart = ({ data, width, height }) => {
    const chartRef = useRef<SVGSVGElement>(null);

    const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 40
    };

    const yExtent = extent(data.map((d: number[][]) => d[1]));

    const xScale = scaleLinear()
        .domain(extent(data.map(d => d[0])))
        .range([margin.left, width - margin.right]);

    const yScale = scaleLinear()
        .domain(yExtent)
        .range([height - margin.bottom, margin.top]);

    const lineChart = line()
        .x(data => xScale(data[0]))
        .y(data => yScale(data[1]));

    const d = lineChart(data);

    useEffect(() => {
        const chart = select(chartRef.current);

        chart
            .select(".yAxis")
            .attr("x1", margin.left)
            .attr("y1", margin.top)
            .attr("x2", margin.left)
            .attr("y2", yScale(Number(yExtent[0])))
            .attr("fill", "none")
            .attr("stroke", "currentColor")
            .attr("stroke-width", "0.5");
    }, [height]);

    return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            ref={chartRef}
        >
            <path
                d={d}
                fill="none"
                stroke="red"
            />

            <line className="yAxis" />

            {yScale.ticks(5).map(max => (
                <g
                    key={max}
                    transform={`translate(0,${yScale(max)})`}
                >
                    <line
                        x1={margin.left}
                        x2={width - margin.right}
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                    <text
                        // y={-5}
                        x={30}
                        fill="currentColor"
                        alignmentBaseline="middle"
                        textAnchor="end"
                        className="text-xs-base-xs-lg"
                    >
                        {max}
                    </text>
                </g>
            ))}
        </svg>
    );
};
