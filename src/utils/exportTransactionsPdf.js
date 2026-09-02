import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const formatIDR = (value) => {
  const n = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);
};

const formatDateTimeID = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

export function exportTransactionsPdf({
  items = [],
  title = "Laporan Transaksi",
  subtitle = "",
  fileName = "laporan-transaksi.pdf",
}) {
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  doc.setFontSize(14);
  doc.text(title, 40, 40);

  if (subtitle) {
    doc.setFontSize(10);
    doc.text(subtitle, 40, 58);
  }

  const head = [[
    "No",
    "Tanggal",
    "Nama",
    "Kelas",
    "Tipe",
    "Status",
    "Nominal",
    "Saldo",
  ]];

  const body = items.map((t, idx) => ([
    String(idx + 1),
    formatDateTimeID(t.date),
    t.name ?? "-",
    t.grade ?? "-",
    t.type ?? "-",
    t.status ?? "-",
    formatIDR(t.amount),
    formatIDR(t.balance),
  ]));

  autoTable(doc, {
    head,
    body,
    startY: subtitle ? 75 : 60,
    styles: { fontSize: 9, cellPadding: 6 },
    headStyles: { fillColor: [24, 20, 243] },
    columnStyles: {
      0: { cellWidth: 28 },
      1: { cellWidth: 90 },
      2: { cellWidth: 90 },
      3: { cellWidth: 40 },
      4: { cellWidth: 55 },
      5: { cellWidth: 55 },
      6: { cellWidth: 75, halign: "right" },
      7: { cellWidth: 75, halign: "right" },
    },
  });

  doc.save(fileName);
}
