import { TableCell, TableRow } from "../ui/table";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import type { ServiceReaspose } from "@/util/responsesTypes";

function ServicesTableRow({
  service,
  locale,
}: {
  service: ServiceReaspose;
  locale: "en" | "ar";
}) {
  const formatService = (service: ServiceReaspose) => ({
    id: service.id,
    titleEn: service.en?.title,
    titleAr: service.ar?.title,
    descriptionEn: service.en?.description,
    descriptionAr: service.ar?.description,
    icon: service.icon?.url,
    path: service.icon?.path || "",
    is_active: service?.is_active || true,
  });

  return (
    <TableRow>
      <TableCell>
        <img
          src={service.icon?.url}
          alt="Service icon"
          className="w-8 h-8 object-contain rounded-full border border-muted-foreground"
        />
      </TableCell>
      <TableCell className="font-medium">{service[locale]?.title}</TableCell>
      <TableCell>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {service[locale]?.description}
        </p>
      </TableCell>
      <TableCell className="text-end">
        <UpdateDeleteModals
          endpoint={`admin/our-features/${service?.id}`}
          mutationKey="our-features"
          updatUrl={`/services/edit/${service?.id}`}
          state={formatService(service)}
          is_active={service.is_active}
        />
      </TableCell>
    </TableRow>
  );
}

export default ServicesTableRow;
