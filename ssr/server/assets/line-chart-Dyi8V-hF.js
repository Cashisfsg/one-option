import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { extent, scaleLinear, line, select } from "d3";
import useMeasure from "react-use-measure";
const LineChart = ({ data }) => {
  const [ref, bounds] = useMeasure();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "aspect-[785_/_595] min-h-[460px] w-full md:aspect-[640_/_240]",
      ref,
      children: bounds.width > 0 ? /* @__PURE__ */ jsx(
        Chart,
        {
          data,
          width: bounds.width,
          height: bounds.height
        }
      ) : null
    }
  );
};
const Chart = ({
  data,
  width,
  height
}) => {
  const chartRef = useRef(null);
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 40
  };
  const yExtent = extent(data == null ? void 0 : data.map((d2) => d2[1]));
  const xScale = scaleLinear().domain(extent(data.map((d2) => d2[0]))).range([margin.left, width - margin.right]);
  const yScale = scaleLinear().domain(yExtent).range([height - margin.bottom, margin.top]);
  const lineChart = line().x((data2) => xScale(data2[0])).y((data2) => yScale(data2[1]));
  const d = lineChart(data);
  useEffect(() => {
    const chart = select(chartRef.current);
    chart.select(".xAxis").attr("x1", margin.left).attr("y1", margin.top).attr("x2", margin.left).attr("y2", height - margin.bottom).attr("fill", "none").attr("stroke", "currentColor").attr("stroke-width", "0.5");
    chart.select(".yAxis").attr("x1", margin.left).attr("y1", height - margin.bottom).attr("x2", width - margin.right).attr("y2", height - margin.bottom).attr("fill", "none").attr("stroke", "currentColor").attr("stroke-width", "0.5");
  }, [height, width]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      ref: chartRef,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d,
            fill: "none",
            stroke: "#FF8551",
            strokeWidth: "5"
          }
        ),
        /* @__PURE__ */ jsx("line", { className: "xAxis" }),
        /* @__PURE__ */ jsx("line", { className: "yAxis" }),
        xScale.ticks(5).map((tick) => /* @__PURE__ */ jsx(
          "line",
          {
            x1: xScale(tick),
            y1: margin.top,
            x2: xScale(tick),
            y2: height - margin.bottom,
            stroke: "currentColor",
            strokeWidth: "0.25",
            opacity: "0.7"
          }
        )),
        yScale.ticks(5).map((tick) => /* @__PURE__ */ jsxs(
          "g",
          {
            transform: `translate(0,${yScale(tick)})`,
            children: [
              /* @__PURE__ */ jsx(
                "line",
                {
                  x1: margin.left,
                  x2: width - margin.right,
                  stroke: "currentColor",
                  strokeWidth: "0.25",
                  opacity: "0.7"
                }
              ),
              /* @__PURE__ */ jsx(
                "text",
                {
                  x: 30,
                  fill: "currentColor",
                  alignmentBaseline: "middle",
                  textAnchor: "end",
                  className: "font-primary text-xs-base-xs-lg",
                  children: tick
                }
              )
            ]
          },
          tick
        ))
      ]
    }
  );
};
export {
  LineChart as L
};
