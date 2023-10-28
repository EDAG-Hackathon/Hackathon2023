export default function Page({
  params,
}: {
  params: { organisationId: string };
}) {
  return (
    <div>
      Organisationsinformationen zu Organisation: {params.organisationId}
    </div>
  );
}
