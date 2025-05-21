import { type ReactNode } from "react";
import useFetch from "@/hooks/UseFetch";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import Skeleton from "./util/Skeleton";
import { TableCell, TableRow } from "./ui/table";
import TableRowSkeleton from "./util/TableRowSkeleton";

interface DataFetcherProps<T> {
  endpoint: string;
  queryKey: [string];
  isTable?: boolean;
  renderLoading?: () => ReactNode;
  renderData: (data: T) => ReactNode;
}

function DataFetcher<T>({
  endpoint,
  queryKey,
  isTable,
  renderLoading,
  renderData,
}: DataFetcherProps<T>) {
  const { t } = useTranslation();

  const { data, isPending, error, refetch } = useFetch({
    endpoint,
    queryKey,
  });

  if (isPending) {
    if(renderLoading)return <>{renderLoading()}</>
    return isTable ? (
      [...Array(5)].map((_, idx) => <TableRowSkeleton key={idx} />)
    ) : (
      <div className="container mx-auto p-6">
        <Skeleton count={3} h={24} />
      </div>
    );
  }

  if (error) {
    return isTable ? (
      <TableRow>
        <TableCell colSpan={4}>
          <div className="text-red-600">
            {t("error_loading_data")}:{" "}
            <Button variant="destructive" onClick={() => refetch()}>
              {t("retry")}
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      <div className="text-red-600">
        {t("error_loading_data")}:{" "}
        <Button variant={"destructive"} onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <>{renderData(data.data)}</>;
}

export default DataFetcher;
