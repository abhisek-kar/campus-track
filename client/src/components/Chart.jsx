import React from "react";
import { Chart as ChartJS, Scale, layouts } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { BsThreeDotsVertical } from "react-icons/bs";

const Chart = ({
  content,
  labels,
  label1,
  label2,
  label3,
  label4,
  data1,
  data2,
  data3,
  data4,
}) => {
  return (
    <>
      <div className="mx-1 p-1 bg-white rounded">
        <div className="flex justify-between poppins-medium text-theme-darkBlue p-1">
          <p>{content}</p>
          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: label1,
                data: data1,
                //   barThickness: 20,
                backgroundColor: "#1075EC",
                borderRadius: 10,
                borderSkipped: false,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
              },
              {
                label: label2,
                data: data2,
                //   barThickness: 20,
                backgroundColor: "#1EC5D8",
                borderRadius: 10,
                borderSkipped: false,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
              },
              {
                label: label3,
                data: data3,
                //   barThickness: 20,
                backgroundColor: "#1EC5D8",
                borderRadius: 10,
                borderSkipped: false,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
              },
              {
                label: label4,
                data: data4,
                //   barThickness: 20,
                backgroundColor: "#1EC5D8",
                borderRadius: 10,
                borderSkipped: false,
                categoryPercentage: 0.5,
                barPercentage: 0.8,
              },
            ],
          }}
          options={{
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  width: 0,
                },
              },
              y: {
                ticks: {
                  display: false,
                },
                grid: {
                  display: false,
                },
                border: {
                  width: 0,
                },
              },
            },
            layout: {
              padding: 10,
            },

            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxHeight: 10,
                  boxWidth: 10,
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Chart;
