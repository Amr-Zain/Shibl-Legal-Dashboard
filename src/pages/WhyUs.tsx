import { useTranslation } from "react-i18next";
import { useThemeConfig } from "@/context/ThemeConfigContext"; // Assuming you need locale here
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import Table from "@/components/util/Table";
import type { Links, Meta, WhyUsResponse } from "@/util/responsesTypes";
import UpdateDeleteModals from "@/components/util/UpdateDeleteModals";

interface APIResponse {
  data: WhyUsResponse[];
  links: Links;
  meta: Meta;
}

function WhyUs() {
  const { t } = useTranslation();
  const { locale } = useThemeConfig();
  const labels = [
    t("whyUs.icon"),
    t("whyUs.key"),
    t("whyUs.value"),
    t("whyUs.actions"),
  ];
  const formateKeyFeature = (feature: WhyUsResponse) => {
    return {
      id: feature.id,
      keyEn: feature.en?.key,
      keyAr: feature.ar?.key,
      value: Number(feature?.value),
      icon: feature?.icon?.path as string,
      is_active: feature?.is_active,
      url: feature?.icon?.url,
    };
  };
  return (
    <div className="space-y-8 p-4 md:p-6 mt-6">
      <PageHeader header={t("sidebar.whyUs")} url="/why-us/create" />

      <div className="rounded-md border overflow-x-auto max-w-[900px] mx-auto">
        <DataFetcher<APIResponse>
          endpoint="admin/why-us"
          queryKey={["why-us"]}
          isTable
          renderData={(response: APIResponse) => {
            const rows = response.data.map((feature) => ({
              id: feature.id,
              data: [
                <img
                  src={feature.icon?.url}
                  alt="Feature Icon"
                  className="h-8 w-8 rounded-full object-cover"
                />,
                feature[locale].key,
                feature.value,
                <div className="text-end">
                  <UpdateDeleteModals
                    endpoint={`admin/why-us/${feature.id}`}
                    mutationKey="why-us"
                    updatUrl={`/why-us/edit/${feature.id}`}
                    state={formateKeyFeature(feature)}
                    is_active={feature.is_active}
                  />
                </div>,
              ],
            }));

            return <Table labels={labels} rows={rows} />;
          }}
        />
      </div>
    </div>
  );
}

export default WhyUs;
