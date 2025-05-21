import SectionCard from "@/components/sections/SectionCard";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SectionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";

function Banners() {
  const { t } = useTranslation();


  useEffect(() => {
    document.title = "Dashboard | Baners";
  }, []);
 

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.sections")} url="/banners/create" />
      <DataFetcher<SectionResponse[]>
        endpoint="admin/listing/banners"
        queryKey={["banners"]}
        renderData={(section: SectionResponse[]) => {
          if (section.length === 0) {
            return (
              <div className="grid grid-cols-1">
                <p className="text-gray-500">{t("noDataFound")}</p>
              </div>
            );
          }
          return section.map((sec) => (
            <div className="grid grid-cols-1">
              <SectionCard key={sec.id} section={sec} isBanner />
            </div>
          ));
        }}
      />
    </div>
  );
}

export default Banners;
