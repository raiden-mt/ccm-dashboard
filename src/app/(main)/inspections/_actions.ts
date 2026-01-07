"use server";

export async function exportInspectionData(formData: FormData) {
  const rawFormData = {
    dateFrom: formData.get("dateFrom"),
    dateTo: formData.get("dateTo"),
    vpa: formData.get("vpa"),
    condition: formData.get("condition"),
  };

  console.log(rawFormData);
}
