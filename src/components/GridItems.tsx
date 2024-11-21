"use client";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amountPrice: number;
  vatRate: number;
  vatNet: number;
}

export interface GridItemsProps {
  data: InvoiceItem[];
}

export default function GridItems({ data }: GridItemsProps) {
  return (
    <div>
      <table>
        <thead>
          <tr className="grid grid-cols-6 gap-[1px]">
            <th className="w-[150px] bg-[#7cacf8]">Description</th>
            <th className="w-[150px] bg-[#7cacf8]">Quantity</th>
            <th className="w-[150px] bg-[#7cacf8]">
              {"Unit Price (Excl. VAT)"}
            </th>
            <th className="w-[150px] bg-[#7cacf8]">
              {"Amount Price (Excl. VAT)"}
            </th>
            <th className="w-[150px] bg-[#7cacf8]">{"VAT Rate (%)"}</th>
            <th className="w-[150px] bg-[#7cacf8]">VAT Net</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                description,
                quantity,
                unitPrice,
                amountPrice,
                vatRate,
                vatNet,
              },
              index,
            ) => {
              return (
                <tr key={index} className="grid grid-cols-6 gap-[1px]">
                  <td className="value-row">{description}</td>
                  <td className="value-row">{quantity}</td>
                  <td className="value-row">{unitPrice}</td>
                  <td className="value-row">{amountPrice}</td>
                  <td className="value-row">{vatRate}</td>
                  <td className="value-row">{vatNet}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
