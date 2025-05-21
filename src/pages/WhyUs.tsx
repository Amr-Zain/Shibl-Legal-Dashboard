import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import type { WhyUsResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
//import Skeleton from "@/components/util/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import KeyValueFeatureRow from "@/components/sections/KeyValueFeature";
import TableRowSkeleton from "@/components/util/TableRowSkeleton";
import { Button } from "@/components/ui/button";

function WhyUs() {
  const { t } = useTranslation();
  const { data, isPending, error, refetch } = useFetch<{
    data: WhyUsResponse[];
  }>({
    endpoint: "admin/why-us",
    queryKey: ["why-us"],
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const features = data?.data as WhyUsResponse[];

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
                {isPending ? (
                  [...Array(5)].map(() => <TableRowSkeleton />)
                ) : error ? (
                  <div className="text-red-600">
                    {t("error_loading_data")}:{" "}
                    <Button variant={"destructive"} onClick={() => refetch()}>
                      {t("retry")}
                    </Button>
                  </div>
                ) : features?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      {t("whyUs.noResults")}
                    </TableCell>
                  </TableRow>
                ) : (
                  features?.map((feature) => (
                    <KeyValueFeatureRow key={feature.id} feature={feature} />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      }
    </div>
  );
}

export default WhyUs;
