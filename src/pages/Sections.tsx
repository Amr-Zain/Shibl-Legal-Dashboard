import SectionCard from "@/components/sections/SectionCard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Links, Meta, SectionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sections } from "@/util/data";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/useUrlParams";
import PaginationComponent from "@/components/util/Pagination";

type SectionsApiResponse = {
  data: SectionResponse[];
  links: Links;
  meta: Meta;
};

function Sections() {
  const { t } = useTranslation();
  const { locale } = useThemeConfig();
  const { updateUrlParams, getParam } = useUrlParams();

  const page = Number(getParam('page')) || 1;
  const filterType = getParam('type') || '';

  useEffect(() => {
    document.title = "Dashboard | Sections";
  }, []);

  const handleFilterChange = (value: string) => {
    updateUrlParams({ type: value, page: 1 });
  };

  const resetFilters = () => {
    updateUrlParams({ type: undefined, page: 1 });
  };

  const buildparams = () => {
    const params = new URLSearchParams();
    if (filterType) params.set('type', filterType);
    if (page > 1) params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.sections")} url="/sections/create" />

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Select onValueChange={handleFilterChange} value={filterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((item) => (
              <SelectItem key={item.type} value={item.type}>
                {item.text[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(filterType || page > 1) && (
          <Button 
            variant="outline" 
            onClick={resetFilters}
            className="ml-2"
          >
            Reset Filters
          </Button>
        )}
      </div>

      <DataFetcher<SectionsApiResponse>
        endpoint={`admin/listing/sections${buildparams()}`}
        queryKey={[`admin/listing/sections${buildparams()}`]}
        renderData={(response) => {
          if (response.data.length === 0) {
            return (
              <div className="grid grid-cols-1">
                <p className="text-gray-500">{t("noDataFound")}</p>
              </div>
            );
          }
          return (
            <>
              <div className="space-y-4">
                {response.data.map((sec) => (
                  <div key={sec.id} className="grid grid-cols-1">
                    <SectionCard section={sec} />
                  </div>
                ))}
              </div>
              <PaginationComponent
                meta={response.meta}
              />
            </>
          );
        }}
      />
    </div>
  );
}

export default Sections;