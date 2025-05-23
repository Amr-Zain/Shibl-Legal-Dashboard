import { useTranslation } from "react-i18next";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import type { Links, Meta, ServiceReaspose } from "@/util/responsesTypes";
import Table from "@/components/util/Table";
import UpdateDeleteModals from "@/components/util/UpdateDeleteModals";
import { formatServiceForm } from "@/lib/utils";
import { useEffect } from "react";

interface APIResponse {
  data: ServiceReaspose[];
  links: Links;
  meta: Meta;
}

function Services() {
  const { t } = useTranslation();
  const { locale } = useThemeConfig();

  const labels = [
    t("service.icon"),
    t("service.title"),
    t("service.description"),
    t("service.actions"),
  ];
  useEffect(()=>{
    document.title = 'Dashboard | Services'
  },[])
  return (
    <div className="space-y-4 mt-6">
      <PageHeader header={t("sidebar.services")} url="/services/create" />
      <div className="rounded-md  overflow-x-auto max-w-[900px] mx-auto">
        <DataFetcher<APIResponse>
          endpoint="admin/our-features"
          queryKey={["our-features"]}
          isTable
          renderData={(services: APIResponse) => {
            const rows = services.data.map((service) =>
              serviceTableDataFormate(service, locale)
            );
            return <Table labels={labels} rows={rows} meta={services.meta} />;
          }}
        />
      </div>
    </div>
  );
}

export default Services;


const serviceTableDataFormate = (
  service: ServiceReaspose,
  locale: "ar" | "en"
) => ({
  id: service.id,
  data: [
    <img src={service.icon.url} alt="Service Icon" className="h-8 w-8" />,
    service[locale].title,
    service[locale].description,
    <div className="text-end">
      <UpdateDeleteModals
        endpoint={`admin/our-features/${service?.id}`}
        mutationKey="our-features"
        updatUrl={`/services/edit/${service?.id}`}
        state={formatServiceForm(service)}
        is_active={service.is_active}
        hideActive
      />
    </div>,
  ],
});
