import { fullbackImage } from "@/util/data";
import UpdateDeleteModals from "../util/UpdateDeleteModals";

function KeyValueFeature({
  feature,
  children,
}: {
  feature: SectionFeatureKeyVal;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {feature.icon && (
          <img
            src={feature.url}
            alt="Feature icon"
            className="size-10 rounded-full object-contain"
            onError={(e) => (e.currentTarget.src = fullbackImage)}
          />
        )}
        <div>
          {feature.key && (
            <span className="text-lg font-medium">{feature.key}: </span>
          )}
          <span>{feature.value}</span>
        </div>
      </div>
      <UpdateDeleteModals
        endpoint={`admin/why-us/${feature.id}`}
        mutationKey="admin/why-us"
      >
        {children}
      </UpdateDeleteModals>
    </div>
  );
}

export default KeyValueFeature;
