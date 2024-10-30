import { SubmitHandler, useForm } from "react-hook-form";

export interface BusinessModalInput {
  name: string;
  streetAddress: string;
  city: string;
  country: string;
  postcode: number;
  phoneNumber: string;
  emailAddress: string;
  vatNumber: string;
}

export interface BusinessModalProps {
  onSubmit: SubmitHandler<BusinessModalInput>;
  onClose: () => void;
  defaultValue?: BusinessModalInput;
}

export default function BusinessModal({
  onSubmit,
  onClose,
  defaultValue,
}: BusinessModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<BusinessModalInput>({
    defaultValues: {
      ...(defaultValue || undefined),
    },
  });
  return (
    <div className="absolute w-full top-10">
      <div className="flex w-full justify-center">
        <div className="bg-white border-2 border-black p-5">
          <div className="flex flex-row-reverse w-full">
            <button className="bg-red-600" onClick={onClose}>
              Close
            </button>
          </div>
          <form
            className="grid grid-rows-[8]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Business name</label>
            <input
              className="border-2 border-black"
              {...register("name", { required: true })}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600" role="alert">
                business name required
              </p>
            )}

            <label>Street address</label>
            <input
              className="border-2 border-black"
              {...register("streetAddress", { required: true })}
              aria-invalid={errors.streetAddress ? "true" : "false"}
            />
            {errors.streetAddress?.type === "required" && (
              <p className="text-red-600" role="alert">
                street address required
              </p>
            )}

            <label>City</label>
            <input
              className="border-2 border-black"
              {...register("city", { required: true })}
              aria-invalid={errors.city ? "true" : "false"}
            />
            {errors.city?.type === "required" && (
              <p className="text-red-600" role="alert">
                city required
              </p>
            )}

            <label>Country</label>
            <input
              className="border-2 border-black"
              {...register("country", { required: true })}
              aria-invalid={errors.country ? "true" : "false"}
            />
            {errors.country?.type === "required" && (
              <p className="text-red-600" role="alert">
                country required
              </p>
            )}

            <label>Postcode</label>
            <input
              className="border-2 border-black"
              {...register("postcode", { required: true })}
              aria-invalid={errors.postcode ? "true" : "false"}
            />
            {errors.postcode?.type === "required" && (
              <p className="text-red-600" role="alert">
                postcode required
              </p>
            )}

            <label>Phone number</label>
            <input
              className="border-2 border-black"
              {...register("phoneNumber", { required: true })}
              aria-invalid={errors.phoneNumber ? "true" : "false"}
            />
            {errors.phoneNumber?.type === "required" && (
              <p className="text-red-600" role="alert">
                phone number required
              </p>
            )}

            <label>Email address</label>
            <input
              className="border-2 border-black"
              {...register("emailAddress", { required: true })}
              aria-invalid={errors.emailAddress ? "true" : "false"}
            />
            {errors.emailAddress?.type === "required" && (
              <p className="text-red-600" role="alert">
                email required
              </p>
            )}

            <label>VAT number</label>
            <input
              className="border-2 border-black"
              {...register("vatNumber", { required: true })}
              aria-invalid={errors.vatNumber ? "true" : "false"}
            />
            {errors.vatNumber?.type === "required" && (
              <p className="text-red-600" role="alert">
                VAT required
              </p>
            )}

            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
