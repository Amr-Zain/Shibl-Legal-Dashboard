import { fullbackImage } from "@/util/data";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import type { WhyUsResponse } from "@/util/responsesTypes";
import { TableCell, TableRow } from "../ui/table";
import { formateKeyFeatureForm } from "@/lib/utils";

function KeyValueFeatureRow({ feature }: { feature: WhyUsResponse }) {
  const { locale } = useThemeConfig();

  return (
    <TableRow>
      <TableCell>
        {feature.icon && (
          <img
            src={feature.icon.url}
            alt="Feature icon"
            className="size-10 rounded-full object-contain"
            onError={(e) => (e.currentTarget.src = fullbackImage)}
          />
        )}
      </TableCell>
      <TableCell>
        {feature[locale]?.key && (
          <span className="font-medium">{feature[locale].key}</span>
        )}
      </TableCell>
      <TableCell>
        <span>{feature.value}</span>
      </TableCell>
      <TableCell className="text-end">
        <UpdateDeleteModals
          endpoint={`admin/why-us/${feature.id}`}
          mutationKey="why-us"
          updatUrl={`/why-us/edit/${feature.id}`}
          is_active={feature.is_active}
          state={formateKeyFeatureForm(feature)}
        />
      </TableCell>
    </TableRow>
  );
}

export default KeyValueFeatureRow;
