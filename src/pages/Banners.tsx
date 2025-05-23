import SectionCard from "@/components/sections/SectionCard";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Links, Meta, SectionResponse } from "@/util/responsesTypes";
import PageHeader from "@/components/util/PageHeader";
import DataFetcher from "@/components/DataFetcher";
import PaginationComponent from "@/components/util/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bannsers } from "@/util/data";
import { useNavigate, useSearchParams } from "react-router";
import { useThemeConfig } from "@/context/ThemeConfigContext";
import { Button } from "@/components/ui/button";
interface APIREsponse {
  data: SectionResponse[];
  links: Links;
  meta: Meta;
}
function Banners() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState<string>("");
  const { locale } = useThemeConfig();

  useEffect(() => {
    const urlPage = searchParams.get("page");
    const urlType = searchParams.get("type");

    if (urlPage) setPage(Number(urlPage));
    if (urlType) setFilterType(urlType);
  }, [searchParams]);

  const buildEndpoint = (params: { type: string }) => {
    const queryParams = new URLSearchParams({
      ...params,
      page: page.toString(),
    });

    return `/banners?${queryParams.toString()}`;
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (filterType) params.set("type", filterType);

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    document.title = "Dashboard | Sections";
    updateUrlParams();
  }, [page, filterType]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
    setPage(1);
  };

  const resetFilters = () => {
    setFilterType("");
    setPage(1);
  };

  useEffect(() => {
    document.title = "Dashboard | Baners";
    updateUrlParams();
  }, [page, filterType]);

  return (
    <div className="space-y-8 md:p-6 mt-6">
      <PageHeader header={t("sidebar.sections")} url="/banners/create" />

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Select onValueChange={handleFilterChange} value={filterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {bannsers.map((item) => (
              <SelectItem key={item.type} value={item.type}>
                {item.text[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(filterType || page > 1) && (
          <Button variant="outline" onClick={resetFilters} className="ml-2">
            Reset Filters
          </Button>
        )}
      </div>
      <DataFetcher<APIREsponse>
        endpoint={`admin/listing${buildEndpoint({ type: filterType })}`}
        queryKey={["banners"]}
        renderData={(response: {
          data: SectionResponse[];
          links: Links;
          meta: Meta;
        }) => {
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
                    <SectionCard section={sec} isBanner />
                  </div>
                ))}
              </div>
              <PaginationComponent
                handlePageChange={handlePageChange}
                links={response.links}
                meta={response.meta}
                page={page}
              />
            </>
          );
        }}
      />
    </div>
  );
}

export default Banners;
