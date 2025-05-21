import { useTranslation } from "react-i18next";
import type { WhyUsResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KeyValueFeatureRow from "@/components/sections/KeyValueFeature";
import DataFetcher from "@/components/DataFetcher";

function WhyUs() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 p-4 md:p-6 mt-6">
      <PageHeader header={t("sidebar.whyUs")} url="/why-us/create" />

      {
        <div className="rounded-md border">
          <div className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("whyUs.icon")}</TableHead>
                  <TableHead>{t("whyUs.key")}</TableHead>
                  <TableHead>{t("whyUs.value")}</TableHead>
                  <TableHead className="text-end">
                    {t("whyUs.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <DataFetcher<WhyUsResponse[]>
                  endpoint="admin/why-us"
                  queryKey={["why-us"]}
                  isTable
                  renderData={(features: WhyUsResponse[]) => {
                    if (features.length === 0) {
                      return (
                        <TableRow>
                          <TableCell colSpan={3} className="h-24 text-center">
                            {t("noDataFound")}
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return features.map((feature) => (
                      <KeyValueFeatureRow key={feature.id} feature={feature} />
                    ));
                  }}
                />
              </TableBody>
            </Table>
          </div>
        </div>
      }
    </div>
  );
}

export default WhyUs;
