import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TermsPolicyForm from "@/components/terms/termsPolicyForm";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import type { SectionResponse } from "@/util/responsesTypes";
import { Loader2 } from "lucide-react";

function Policy() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Dashboard | Privacy-Policy";
  }, []);

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader  header={t("policy.title")} />
      <DataFetcher<SectionResponse[]>
        endpoint="admin/sections?type=privacy_policy"
        queryKey={["privacy_policy"]}
         renderLoading={() => (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        renderData={(data: SectionResponse[]) => {
          return <TermsPolicyForm type="privacy_policy" data={data[0]} />
        }}
      />
    </div>
  );
}

export default Policy;
