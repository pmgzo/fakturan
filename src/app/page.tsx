"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";
import ClientModal, { ClientModalInput } from "@/components/ClientModal";
import ModalButton from "@/components/ModalButton";
import BusinessModal, { BusinessModalInput } from "@/components/BusinessModal";

function createPdf() {
  const doc = new jsPDF();

  // doc.text("Hello world!", 10, 10);

  let config = {
    autoSize: true,
    printHeaders: true,
  };

  // doc.setTableHeaderRow([{name: "test1", prompt: "test", align: "center", padding: 10, width: 100}]);
  doc.table(10, 20, [{ Test1: "test" }], ["Test1"], config);
  doc.save("a4.pdf");
}

enum ModalState {
  CLOSED,
  CLIENT,
  BUSINESS,
}

export default function Home() {
  const [openedModal, setOpenedModal] = useState<ModalState>(ModalState.CLOSED);
  const [clientInfos, setClientInfos] = useState<ClientModalInput | undefined>(
    undefined,
  );
  const [businessInfos, setBusinessInfos] = useState<
    BusinessModalInput | undefined
  >(undefined);

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
          onClose={() => setOpenedModal(ModalState.CLOSED)}
        />
      )}
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div>
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
          {/* Here should be the table with services and products */}
          <button className="bg-red-600" onClick={createPdf}>
            Dowload Invoice
          </button>
        </div>
      </div>
    </>
  );
}
