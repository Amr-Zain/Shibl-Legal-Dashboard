import { fullbackImage } from "@/util/data";
import UpdateDeleteModals from "../util/NewUpade";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import type { WhyUsResponse } from "@/util/responsesTypes";
import { TableCell, TableRow } from "../ui/table";

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
      <TableCell className="text-right">
        <UpdateDeleteModals
          endpoint={`admin/why-us/${feature.id}`}
          mutationKey="why-us"
          updatUrl={`/why-us/edit/${feature.id}`}
          state={{
            id: feature.id,
            keyEn: feature.en?.key,
            keyAr: feature.ar?.key,
            value: Number(feature?.value),
            icon: feature?.icon?.path as string,
            is_active: feature?.is_active,
            url: feature?.icon?.url,
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default KeyValueFeatureRow;