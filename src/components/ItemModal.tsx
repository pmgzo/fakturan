import { SubmitHandler, useForm } from "react-hook-form";

export interface ItemModalInput {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

export interface ItemModalProps {
  onSubmit: SubmitHandler<ItemModalInput>;
  onClose: () => void;
  defaultValue?: ItemModalInput;
}

export default function ItemModal({ onSubmit, onClose }: ItemModalProps) {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm<ItemModalInput>({
    defaultValues: { description: "", quantity: 0, unitPrice: 0, vatRate: 0 },
  });

  const [quantity, unitPrice, vatRate] = watch([
    "quantity",
    "unitPrice",
    "vatRate",
  ]);

  return (
    <div className="absolute w-full top-[150px]">
      <div className="flex w-full justify-center">
        <div className="bg-white border-2 border-black p-5">
          <div className="flex flex-row-reverse w-full">
            <button className="bg-red-600" onClick={onClose}>
              Close
            </button>
          </div>
          <form className="grid grid-cols-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Description</label>
              <input
                className="border-2 border-black"
                {...register("description", { required: true })}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description?.type === "required" && (
                <p className="text-red-600" role="alert">
                  description required
                </p>
              )}
            </div>

            <div>
              <label>Quantity</label>
              <input
                className="border-2 border-black"
                {...register("quantity", { required: true })}
                aria-invalid={errors.quantity ? "true" : "false"}
              />
              {errors.quantity?.type === "required" && (
                <p className="text-red-600" role="alert">
                  quantity required
                </p>
              )}
            </div>

            <div>
              <label>Unit Price</label>
              <input
                className="border-2 border-black"
                {...register("unitPrice", { required: true })}
                aria-invalid={errors.unitPrice ? "true" : "false"}
              />
              {errors.unitPrice?.type === "required" && (
                <p className="text-red-600" role="alert">
                  unit price required
                </p>
              )}
            </div>

            <div>
              <label>{"VAT Rate (%)"}</label>
              <input
                className="border-2 border-black"
                {...register("vatRate", { required: true })}
                aria-invalid={errors.vatRate ? "true" : "false"}
              />
              {errors.vatRate?.type === "required" && (
                <p className="text-red-600" role="alert">
                  unit price required
                </p>
              )}
            </div>

            <div className="px-5">
              <div>
                <label>Amount Price: </label>
                {quantity * unitPrice}
              </div>
              <div>
                <label>VAT Net: </label>
                {(quantity * unitPrice * vatRate) / 100}
              </div>
            </div>

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
