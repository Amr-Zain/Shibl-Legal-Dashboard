import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Skeleton = ({ className }: { className: string }) => {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
};

export { Skeleton };

const TableRowSkeleton = ({ icon = true }: { icon?: boolean }) => (
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

// Complete Table Component with Skeletons
const CompleteTableSkeleton = ({ rows = 5, showIcon = true }: { rows?: number, showIcon?: boolean }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showIcon && <TableHead className="w-[50px]">Image</TableHead>}
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRowSkeleton key={index} icon={showIcon} />
        ))}
      </TableBody>
    </Table>
  );
};

export default CompleteTableSkeleton;