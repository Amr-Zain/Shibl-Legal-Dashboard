import { fullbackImage } from "@/util/data";
import UpdateDeleteModals from "../util/UpdateDeleteModals";
import { WhyUsForm } from "../whyUs/WhyUsForm";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import type { WhyUsResponse } from "@/util/responsesTypes";
import { useState } from "react";

function KeyValueFeature({ feature }: { feature: WhyUsResponse }) {
  const { locale } = useThemeConfig();
  const [updateModal, setUpdateModal] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div className="flex items-center gap-3">
        {feature.icon && (
          <img
            src={feature.icon.url}
            alt="Feature icon"
            className="size-10 rounded-full object-contain"
            onError={(e) => (e.currentTarget.src = fullbackImage)}
          />
        )}
        <div>
          {feature[locale]?.key && (
            <span className="text-lg font-medium">{feature[locale].key}: </span>
          )}
          <span>{feature.value}</span>
        </div>
      </div>
      <UpdateDeleteModals
        endpoint={`admin/why-us/${feature.id}`}
        mutationKey="why-us"
        updateModal={updateModal}
        setUpdateModal={setUpdateModal}
      >
        <WhyUsForm
          defaultValues={{
            id: feature.id,
            keyEn: feature.en?.key,
            keyAr: feature.ar?.key,
            value: Number(feature?.value),
            icon: feature?.icon?.path as string,
            is_active: feature?.is_active,
            url: feature?.icon?.url,
          }}
          onCancel={()=>setUpdateModal(false)}
          isUpdate
        />
      </UpdateDeleteModals>
    </div>
  );
}

export default KeyValueFeature;
