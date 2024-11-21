import { InvoiceItem } from "@/components/GridItems";
import { jsPDF } from "jspdf";
import { DatesState, TotalsState } from "./types";
import { BusinessModalInput } from "@/components/BusinessModal";
import { ClientModalInput } from "@/components/ClientModal";
import autoTable from "jspdf-autotable";

export interface GeneratePDFProps {
  items: InvoiceItem[];
  dates: DatesState;
  businessInfos?: BusinessModalInput;
  clientInfos?: ClientModalInput;
  invoiceNumber: string;
  totals: TotalsState;
}

function formatBusinessInfos(businessInfos: BusinessModalInput) {
  return `${businessInfos.name}\n${businessInfos.streetAddress}\n${businessInfos.city}\n${businessInfos.country}\n${businessInfos.postcode}\n${businessInfos.phoneNumber}\n${businessInfos.emailAddress}\n${businessInfos.vatNumber}`;
}

function formatClientInfos(clientInfos: ClientModalInput) {
  return `${clientInfos.name}\n${clientInfos.streetAddress}\n${clientInfos.city}\n${clientInfos.country}\n${clientInfos.postcode}\n${clientInfos.phoneNumber}\n${clientInfos.emailAddress}\n`;
}

function formatDates(dates: DatesState) {
  return `Tax point (Time of supply): ${new Intl.DateTimeFormat().format(dates.taxPoint)}\nIssue Date: ${new Intl.DateTimeFormat().format(dates.dueDate)}\nDue Date: ${new Intl.DateTimeFormat().format(dates.dueDate)}\n`;
}

function formatTotals(totals: TotalsState) {
  return `Subtotal: ${totals.subtotal}\nVAT total: ${totals.vatTotal}\nTotal due: ${totals.total}`;
}

function createTable({ items, doc }: { items: InvoiceItem[]; doc: jsPDF }) {
  const headers = [
    "Description",
    "Quantity",
    "Unit Price (Excl. VAT)",
    "Amount Price (Excl. VAT)",
    "VAT Rate (%)",
    "VAT Net",
  ];
  const elementsTable = items.map(
    ({ description, quantity, unitPrice, amountPrice, vatRate, vatNet }) => [
      description,
      quantity.toString(),
      unitPrice.toString(),
      amountPrice.toString(),
      vatRate.toString(),
      vatNet.toString(),
    ],
  );

  autoTable(doc, {
    head: [headers],
    body: elementsTable,
    startY: 110,
  });
}

export default function generatePdf({
  items,
  dates,
  businessInfos,
  clientInfos,
  invoiceNumber,
  totals,
}: GeneratePDFProps) {
  const doc = new jsPDF();

  console.log(doc.canvas.height);

  if (businessInfos) {
    doc.text(formatBusinessInfos(businessInfos), 10, 10);
  }

  if (clientInfos) {
    doc.text(formatClientInfos(clientInfos), 120, 10);
  }

  doc.setFontSize(13);

  doc.text(`Invoice Number: ${invoiceNumber}`, 90, 70);
  doc.text(formatDates(dates), 90, 82);
  createTable({ items, doc });
  doc.text(formatTotals(totals), 15, doc.lastAutoTable.finalY + 10);

  doc.save(`invoice_${invoiceNumber}.pdf`);
}
