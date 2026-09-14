import { redirect } from "next/navigation";

export default async function AdminCertificateByIdPage({ params }) {
  const { id } = await params;
  redirect(`/admin/certificates/preview?id=${encodeURIComponent(id)}`);
}
