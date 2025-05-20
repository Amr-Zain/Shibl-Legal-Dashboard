import SectionCard from "@/components/sections/SectionCard";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import type { SectionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";

function Sections() {
  const { t } = useTranslation();
  const { data, isPending } = useFetch<{ data: SectionResponse }>({
    endpoint: "admin/sections",
    queryKey: ["sections"],
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const secionsList = data?.data as SectionResponse[];


  useEffect(() => {
    document.title = "Dashboard | Sections";
  }, []);

  const SecionsList = secionsList?.map((sec) => (
    <SectionCard key={sec.id} section={sec} isBanner={false} />
  ));

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader
        header={t("sidebar.sections")}
        url="/sections/create"
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

export default Sections;
