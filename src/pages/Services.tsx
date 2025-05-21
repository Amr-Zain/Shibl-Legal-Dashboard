import { useTranslation } from "react-i18next";
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
import DataFetcher from "@/components/DataFetcher";
import type { ServiceReaspose } from "@/util/responsesTypes";

function Services() {
  const { t } = useTranslation();

  const { locale } = useThemeConfig();

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
              <DataFetcher<ServiceReaspose[]>
                endpoint="admin/our-features"
                queryKey={["our-features"]}
                isTable
                renderData={(services: ServiceReaspose[]) => {
                  if (services.length === 0) {
                    return (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          {t("service.noResults")}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return services.map((service) => (
                    <ServicesTableRow
                      key={service.id}
                      service={service}
                      locale={locale}
                    />
                  ));
                }}
              />
            </TableBody>
          </Table>
        </div>
      }
    </div>
  );
}

export default Services;
