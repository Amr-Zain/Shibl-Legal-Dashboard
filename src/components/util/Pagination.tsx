import { useSearchParams, useLocation, Link } from 'react-router';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type Meta = {
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  total: number;
};

export default function PaginationComponent({ meta }: { meta: Meta }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = meta.current_page;
  const totalPages = meta.last_page;

  // Generate page URL with updated page parameter
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  // Generate visible page numbers with ellipsis
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 5; // Maximum visible page numbers
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = currentPage - half;
      let end = currentPage + half;
      
      if (start < 1) {
        start = 1;
        end = maxVisible;
      }
      
      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisible + 1;
      }
      
      // Always show first page
      if (start > 1) {
        visiblePages.push(1);
        if (start > 2) {
          visiblePages.push('ellipsis-start');
        }
      }
      
      // Middle pages
      for (let i = start; i <= end; i++) {
        if (i > 0 && i <= totalPages) {
          visiblePages.push(i);
        }
      }
      
      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) {
          visiblePages.push('ellipsis-end');
        }
        visiblePages.push(totalPages);
      }
    }
    
    return visiblePages;
  };

  return (
    <>
      <Pagination>
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <Link 
              to={createPageUrl(currentPage - 1)}
              onClick={(e) => {
                if (currentPage <= 1) {
                  e.preventDefault();
                }
              }}
              className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}
              aria-disabled={currentPage <= 1}
            >
              <PaginationPrevious isActive={currentPage > 1} />
            </Link>
          </PaginationItem>

          {/* Page numbers */}
          {getVisiblePages().map((page, index) => {
            if (typeof page === 'string') {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={index}>
                <Link to={createPageUrl(page)}>
                  <PaginationLink isActive={page === currentPage}>
                    {page}
                  </PaginationLink>
                </Link>
              </PaginationItem>
            );
          })}

          {/* Next button */}
          <PaginationItem>
            <Link 
              to={createPageUrl(currentPage + 1)}
              onClick={(e) => {
                if (currentPage >= totalPages) {
                  e.preventDefault();
                }
              }}
              className={currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""}
              aria-disabled={currentPage >= totalPages}
            >
              <PaginationNext isActive={currentPage < totalPages} />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Results info */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{meta.from}</span> to{" "}
        <span className="font-medium">{meta.to}</span> of{" "}
        <span className="font-medium">{meta.total}</span> sections
      </div>
    </>
  );
}