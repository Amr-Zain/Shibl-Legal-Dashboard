import { useTranslation } from "react-i18next";
import useFetch from "@/hooks/UseFetch";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import PageHeader from "@/components/util/PageHeader";
import Skeleton from "@/components/util/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServicesTableRow from "@/components/sections/ServiceRow";

function Services() {
  const { t } = useTranslation();
  const { data, isPending } = useFetch({
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
      
      {isPending ? (
        <div className="container mx-auto p-6">
          <Skeleton count={4} h={30} />
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto max-w-[900px] mx-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("service.icon")}</TableHead>
                  <TableHead>{t("service.title")}</TableHead>
                  <TableHead>{t("service.description")}</TableHead>
                  <TableHead className="text-right">{t("service.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services?.length === 0 ? (
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
      )}
    </div>
  );
}

export default Services;