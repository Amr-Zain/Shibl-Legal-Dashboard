import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import PageHeader from "@/components/util/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServicesTableRow from "@/components/sections/ServiceRow";
import TableRowSkeleton from "@/components/util/TableRowSkeleton";
import { Button } from "@/components/ui/button";

function Services() {
  const { t } = useTranslation();
  const { data, isPending, error, refetch } = useFetch({
    endpoint: "admin/our-features",
    queryKey: ["our-features"],
  });

  const { locale } = useThemeConfig();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const services = data?.data as ServiceReaspose[];

  return (
    <div className="space-y-4 mt-6">
      <PageHeader header={t("sidebar.services")} url="/services/create" />

      {
        <div className="rounded-md border overflow-x-auto max-w-[900px] mx-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("service.icon")}</TableHead>
                <TableHead>{t("service.title")}</TableHead>
                <TableHead>{t("service.description")}</TableHead>
                <TableHead className="text-end">
                  {t("service.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending && [...Array(5)].map(() => <TableRowSkeleton />)}
              {error ? (
                <div className="text-red-600">
                  {t("error_loading_data")}:{" "}
                  <Button variant={"destructive"} onClick={() => refetch()}>
                    {t("retry")}
                  </Button>
                </div>
              ) : services?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    {t("service.noResults")}
                  </TableCell>
                </TableRow>
              ) : (
                services?.map((service) => (
                  <ServicesTableRow
                    key={service.id}
                    service={service}
                    locale={locale}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      }
    </div>
  );
}

export default Services;
