import { cn } from "@/lib/utils"; 
import { TableCell, TableRow } from "../ui/table";

const Skeleton = ({
  className,
}: {
  className: string;
}) => {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
};

export { Skeleton };
const TableRowSkeleton = ({ icon = true}: { icon?:boolean}) => (
  <TableRow>
    {icon && (
      <TableCell>
        <Skeleton className="h-8 w-8 rounded-full" />
      </TableCell>
    )}
    <TableCell>
      <Skeleton className="h-6 w-3/4" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-full" />
    </TableCell>
    <TableCell className="text-right">
      <div className="flex justify-end space-x-2">
        <Skeleton className="h-8 w-12 rounded-md" />{" "}
        <Skeleton className="h-8 w-12 rounded-md" />{" "}
      </div>
    </TableCell>
  </TableRow>
);
export default TableRowSkeleton;
