import SectionCard from "@/components/sections/SectionCard";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import type { SectionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";

function Banners() {
  const { t } = useTranslation();
  const { data, isPending } = useFetch<{ data: SectionResponse }>({
    endpoint: "admin/listing/banners",
    queryKey: ["banners"],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const secionsList = data?.data as SectionResponse[];

  useEffect(() => {
    document.title = "Dashboard | Baners";
  }, []);
  const SecionsList = secionsList?.map((sec) => (
    <SectionCard key={sec.id} section={sec} isBanner />
  ));

  return (
    <div className="space-y-8 md:p-6 mt-6">

      <PageHeader
        header={t("sidebar.sections")}
        url="/banners/create"
      />
      {isPending ? (
        <div className="container mx-auto p-6">
          <Skeleton count={3} h={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1">{SecionsList}</div>
      )}
    </div>
  );
}

export default Banners;
