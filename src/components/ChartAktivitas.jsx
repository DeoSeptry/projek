import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTransactionsChartQuery } from "../services/api/transactions.api";



function toYmd(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function formatCurrencyIDR(value) {
  const n = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatXAxisLabel(period, groupBy) {
  // period dari API biasanya "YYYY-MM-DD"
  if (!period) return "";
  if (groupBy === "month") {
    // kalau backend nanti ngirim "YYYY-MM", tetap aman
    const [y, m] = period.split("-");
    if (y && m) return `${m}/${y}`;
    return period;
  }
  // day
  const [y, m, d] = period.split("-");
  if (y && m && d) return `${d}/${m}`;
  return period;
}

export default function CharAktivitas() {
  // filter state
  const [type, setType] = React.useState("deposit"); // deposit | withdraw
  const [groupBy, setGroupBy] = React.useState("day"); // day | month

  // default: last 30 days
  const [startDate, setStartDate] = React.useState(() => toYmd(daysAgo(30)));
  const [endDate, setEndDate] = React.useState(() => toYmd(new Date()));

  const params = React.useMemo(
    () => ({
      type,
      groupBy,
      startDate,
      endDate,
    }),
    [type, groupBy, startDate, endDate]
  );

  const {
    data: chartData = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetTransactionsChartQuery(params);

  const title =
    type === "deposit" ? "Grafik Setoran" : "Grafik Penarikan";

  return (
    <div className="bg-white p-6 rounded-[2rem]">
      {/* Header + Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-[22px] text-[#343C6A] font-medium">{title}</h1>
          <p className="text-sm text-[#718EBF] mt-1">
            {groupBy === "day" ? "Per hari" : "Per bulan"} • {startDate} s/d{" "}
            {endDate}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdraw</option>
            <option value="balance">Balance</option>

          </select>

          {/* GroupBy */}
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white"
          >
            <option value="day">Group by Day</option>
            <option value="month">Group by Month</option>
          </select>

          {/* Date range */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white"
          />

          {/* Presets */}
          <button
            type="button"
            onClick={() => {
              setStartDate(toYmd(daysAgo(7)));
              setEndDate(toYmd(new Date()));
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
          >
            7 Hari
          </button>

          <button
            type="button"
            onClick={() => {
              setStartDate(toYmd(daysAgo(30)));
              setEndDate(toYmd(new Date()));
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
          >
            30 Hari
          </button>

          <button
            type="button"
            onClick={() => refetch()}
            className="px-3 py-2 rounded-xl bg-[#1814F3] text-white text-sm hover:bg-blue-700 disabled:opacity-60"
            disabled={isFetching}
          >
            {isFetching ? "Memuat..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error ? (
        <p className="text-sm text-red-600 mt-4">
          Gagal memuat chart transaksi.
        </p>
      ) : null}

      {/* Chart */}
      <div className="mt-6 h-[280px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-[#718EBF]">
            Memuat chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#718EBF", fontSize: 12 }}
                dy={10}
                tickFormatter={(v) => formatXAxisLabel(v, groupBy)}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#718EBF", fontSize: 12 }}
                tickFormatter={(v) => formatCurrencyIDR(v)}
              />
              <Tooltip
                formatter={(value) => formatCurrencyIDR(value)}
                labelFormatter={(label) =>
                  groupBy === "day" ? `Tanggal: ${label}` : `Periode: ${label}`
                }
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1814F3"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Empty State */}
      {!isLoading && !error && chartData.length === 0 ? (
        <div className="mt-4 text-sm text-[#718EBF]">
          Tidak ada data pada rentang tanggal ini.
        </div>
      ) : null}
    </div>
  );
}
