import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const chartRef = useRef();

  const options = {
    responsive: false,
    layout: {
      padding: {
        right: 30,
      },
    },
    scales: {
      x: {
        min: 0,
        max: 6,
      },
    },
    plugins: {
      decimation: {
        enabled: true,
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const myChart = {
    id: "myChart",

    afterEvent(chart, args) {
      const {
        ctx,
        canvas,
        chartArea: { left, right, height, top, bottom, width },
      } = chart;

      canvas.addEventListener("mousemove", (event) => {
        const x = args.event.x;
        const y = args.event.y;

        if (
          x >= left - 15 &&
          x <= left + 15 &&
          y >= height / 2 + top - 15 &&
          y <= height / 2 + top + 15
        ) {
          return (canvas.style.cursor = "pointer");
        } else if (
          x >= right - 15 &&
          x <= right + 15 &&
          y >= height / 2 + top - 15 &&
          y <= height / 2 + top + 15
        ) {
          return (canvas.style.cursor = "pointer");
        } else {
          return (canvas.style.cursor = "default");
        }
      });
    },

    afterDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, right, height, top, bottom, width },
      } = chart;

      const angle = Math.PI / 180;

      class circleChevron {
        draw(ctx, x1, pixel) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(102,102,102,0.5)";
          ctx.arc(x1, height / 2 + top, 15, angle * 0, angle * 360, false);
          ctx.stroke();
          ctx.fill();
          ctx.fillStyle = "#ffffff";
          ctx.closePath();

          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgb(171, 0, 37)";
          ctx.moveTo(x1 + pixel, height / 2 + top - 7.5);
          ctx.lineTo(x1 - pixel, height / 2 + top);
          ctx.lineTo(x1 + pixel, height / 2 + top + 7.5);
          ctx.stroke();
          ctx.closePath();
        }
      }

      let drawCircleLeft = new circleChevron();
      drawCircleLeft.draw(ctx, left, 5);

      let drawCircleRight = new circleChevron();
      drawCircleRight.draw(ctx, right, -5);
    },
  };

  const dataBar = {
    labels,
    datasets: [
      {
        data: [
          30, 100, 500, 468, 980, 300, 30, 100, 500, 468, 980, 300, 500, 450,
          800, 468, 80, 320,
        ],
        label: "Dataset 1",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        data: [
          500, 450, 800, 468, 80, 320, 500, 450, 800, 468, 80, 320, 500, 450,
          800, 468, 80, 320,
        ],
        label: "Dataset 2",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  function moveScroll(event) {
    const { current: chart } = chartRef;
    const {
      ctx,
      canvas,
      chartArea: { left, right, top, bottom, width, height },
    } = chart;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (
      x >= left - 15 &&
      x <= left + 15 &&
      y >= height / 2 + top - 15 &&
      y <= height / 2 + top + 15
    ) {
      chart.options.scales.x.min = chart.options.scales.x.min - 7;
      chart.options.scales.x.max = chart.options.scales.x.max - 7;

      if (chart.options.scales.x.max <= 0) {
        chart.options.scales.x.min = 0;
        chart.options.scales.x.max = 6;
      }
    }

    if (
      x >= right - 15 &&
      x <= right + 15 &&
      y >= height / 2 + top - 15 &&
      y <= height / 2 + top + 15
    ) {
      chart.options.scales.x.min = chart.options.scales.x.min + 7;
      chart.options.scales.x.max = chart.options.scales.x.max + 7;

      if (chart.options.scales.x.max >= dataBar.datasets[0].data.length) {
        chart.options.scales.x.min = dataBar.datasets[0].data.length - 7;
        chart.options.scales.x.max = dataBar.datasets[0].data.length;
      }
    }
    chart.update();
  }

  return (
    <Bar
      options={options}
      data={dataBar}
      plugins={[myChart]}
      height={600}
      width={850}
      ref={chartRef}
      onClick={moveScroll}
    />
  );
}

export default Chart;
