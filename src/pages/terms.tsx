import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import TermsPolicyForm from "@/components/terms/termsPolicyForm";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import type { SectionResponse } from "@/util/responsesTypes";
import { Loader2 } from "lucide-react";

interface APIResponse {
  data: SectionResponse[];
}
function Terms() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Dashboard | Terms";
  }, []);

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("terms.title")} />
      <DataFetcher<APIResponse>
        endpoint="admin/sections?type=terms"
        queryKey={["privacy_policy"]}
        renderLoading={() => (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
        renderData={(data: APIResponse) => {
          return <TermsPolicyForm type="terms" data={data.data[0]} />;
        }}
      />
    </div>
  );
}

export default Terms;
