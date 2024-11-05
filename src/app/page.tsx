"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";
import ClientModal, { ClientModalInput } from "@/components/ClientModal";
import ModalButton from "@/components/ModalButton";
import BusinessModal, { BusinessModalInput } from "@/components/BusinessModal";
import GridItems, { InvoiceItem } from "@/components/GridItems";
import ItemModal from "@/components/ItemModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: move
function createPdf() {
  const doc = new jsPDF();

  // doc.text("Hello world!", 10, 10);

  let config = {
    autoSize: true,
    printHeaders: true,
  };

  // doc.table(10, 20, [{ Test1: "test" }], ["Test1"], config);
  // doc.save("a4.pdf");
}

enum ModalState {
  CLOSED,
  CLIENT,
  BUSINESS,
  ITEM,
}

interface TotalsState {
  subtotal: number
  vatTotal: number
  total: number;
}

interface DatesState {
  taxPoint: Date
  dueDate: Date
}


export default function Home() {
  const [openedModal, setOpenedModal] = useState<ModalState>(ModalState.CLOSED);
  const [clientInfos, setClientInfos] = useState<ClientModalInput | undefined>(
    undefined,
  );
  const [businessInfos, setBusinessInfos] = useState<
    BusinessModalInput | undefined
  >(undefined);

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [totals, setTotals] = useState<TotalsState>({subtotal: 0, vatTotal: 0, total: 0});
  const [dates, setDates] = useState<DatesState>({taxPoint: new Date(), dueDate: new Date()});

  function closeModal() {
    setOpenedModal(ModalState.CLOSED);
  }

  return (
    <>
      {openedModal === ModalState.CLIENT && (
        <ClientModal
          onSubmit={(data) => {
            setClientInfos({
              ...data,
            });
            closeModal();
          }}
          onClose={closeModal}
          defaultValue={clientInfos}
        />
      )}
      {openedModal === ModalState.BUSINESS && (
        <BusinessModal
          onSubmit={(data) => {
            setBusinessInfos({ ...data });
            closeModal();
          }}
          onClose={closeModal}
        />
      )}
      {openedModal === ModalState.ITEM && (
        <ItemModal
          onSubmit={({ description, quantity, unitPrice, vatRate }) => {
            //TODO: update item array
            const newArray = items;
            newArray.push({
              description,
              quantity,
              unitPrice: unitPrice,
              amountPrice: quantity * unitPrice,
              vatRate,
              vatNet: (quantity * unitPrice * vatRate) / 100,
            });
            setItems(newArray);

            const subtotal = newArray.reduce((total, {amountPrice}) => (total + amountPrice), 0)
            const vatTotal = newArray.reduce((total, {vatNet}) => (total + vatNet), 0)

            setTotals({subtotal, vatTotal, total: subtotal + vatTotal})

            closeModal();
          }}
          onClose={closeModal}
        />
      )}

      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="mt-[10px] flex justify-evenly">
            <ModalButton
              infosCompleted={!!businessInfos}
              onClick={() => setOpenedModal(ModalState.BUSINESS)}
            >
              Fill in your business's infos
            </ModalButton>
            <ModalButton
              infosCompleted={!!clientInfos}
              onClick={() => setOpenedModal(ModalState.CLIENT)}
            >
              Fill in your client's infos
            </ModalButton>
          </div>
          <div className="absolute left-[100px] top-[125px]">
            <div className="grid grid-flow-row gap-[20px]">

            <button
              className="bg-[#7cacf8]"
              onClick={() => setOpenedModal(ModalState.ITEM)}
            >
              Add row
            </button>

            <div className="grid grid-flow-rows">
              <label>Tax Point </label>
              <DatePicker dateFormat="dd/MM/YYYY" selected={dates.taxPoint} onChange={(date) => setDates({...dates, taxPoint: date || new Date()})} />
            </div>

            <div className="grid grid-flow-rows">
              <label>Due Date </label>
              <DatePicker dateFormat="dd/MM/YYYY" selected={dates.dueDate} onChange={(date) => setDates({...dates, dueDate: date ? date : new Date()})} />
            </div>

            <button className="bg-red-200" onClick={createPdf}>
              Dowload Invoice
            </button>

            </div>
          </div>
          <div className="mt-[50px]">
            <GridItems data={items} />
          </div>
          <div className="absolute right-[100px] top-[100px]">
            <div className="grid grid-flow-row">
              <div>
                <label>
                  Subtotal: 
                </label>
              {totals.subtotal}
              </div>
              <div>
                <label>
                  Vat Total: 
                </label>
              {totals.vatTotal}
              </div>
              <div>
                <label>
                  Total: 

                </label>
              {totals.total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
