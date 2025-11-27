"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Activity } from "lucide-react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function HealthChart({ dark }) {
    const options = {
        chart: {
            type: "area",
            toolbar: { show: false },
            fontFamily: "inherit",
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        colors: ["#0EA5E9", "#10B981"],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: "smooth",
            width: 3,
            lineCap: 'round'
        },
        xaxis: {
            categories: ["Jan 15", "Jan 16", "Jan 17", "Jan 18", "Jan 19", "Jan 20", "Jan 21"], // 2025 Dates
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: dark ? "#9ca3af" : "#6b7280",
                    fontSize: '12px',
                    fontWeight: 500
                }
            }
        },
        yaxis: { show: false },
        grid: {
            borderColor: dark ? "#374151" : "#f3f4f6",
            strokeDashArray: 4,
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
        },
        tooltip: {
            theme: dark ? "dark" : "light",
            y: {
                formatter: function (val) {
                    return val + " bpm";
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            labels: { colors: dark ? "#fff" : "#374151" }
        }
    };

    const series = [
        { name: "Heart Rate", data: [72, 75, 71, 73, 70, 74, 72] },
        { name: "Activity Score", data: [30, 45, 35, 50, 40, 60, 55] }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700/50 h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                        <Activity className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Health Trends (2025)</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Weekly overview</p>
                    </div>
                </div>
                <select className="text-xs bg-gray-50 dark:bg-gray-700 border-none rounded-lg px-3 py-1.5 text-gray-600 dark:text-gray-300 font-medium focus:ring-2 focus:ring-sky-500/20 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <option>Jan 2025</option>
                    <option>Dec 2024</option>
                    <option>Nov 2024</option>
                </select>
            </div>

            <div className="h-64 w-full">
                <Chart options={options} series={series} type="area" height="100%" />
            </div>
        </div>
    );
}
