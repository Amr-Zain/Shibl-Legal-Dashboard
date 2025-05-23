import { useTranslation } from "react-i18next";
import { Card } from "../ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as ShadcnTable,
} from "../ui/table";
import PaginationComponent from "./Pagination";
import type { Meta } from "@/util/responsesTypes";

interface TableRowData {
  id: number;
  data: React.ReactNode[];
}
interface TableProps {
  labels: string[];
  rows: TableRowData[];
  meta?:Meta
}

function Table({ labels, rows,meta }: TableProps) {
  const { t } = useTranslation();
  return (
    <>
      <Card className="p-4">
        <ShadcnTable className="min-w-full">
          <TableHeader>
            <TableRow>
              {labels.map((label: string, index: number) => (
                <TableHead key={index}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {!rows.length ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  {t("noDataFound")}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.data.map((cell: React.ReactNode, cellIndex: number) => (
                    <TableCell key={cellIndex} className="font-medium">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </ShadcnTable>
      </Card>
      {meta&&<PaginationComponent meta={meta} />}
    </>
  );
}

export default Table;
