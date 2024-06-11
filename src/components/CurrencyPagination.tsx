import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CurrencyPaginationProps } from "@/utils/types";

import React from "react";

const CurrencyPagination = ({ page, setPage }: CurrencyPaginationProps) => {
  const handlePrevious = () => {
    if (page > 1) {
      window.scroll(0, 0);
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    window.scroll(0, 0);
    setPage(page + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    window.scroll(0, 0);
    setPage(pageNumber);
  };

  return (
    <div className="mb-20">
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem className="cursor-pointer" onClick={handlePrevious}>
              <PaginationPrevious />
            </PaginationItem>
          )}
          {[...Array(3)].map((_, index) => (
            <PaginationItem
              key={index}
              className="cursor-pointer"
              onClick={() => handlePageClick(page + index)}
            >
              {page + index <= 10 && (
                <PaginationLink isActive={page === page + index}>
                  {page + index}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          {page < 8 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page < 10 && (
            <PaginationItem className="cursor-pointer" onClick={handleNext}>
              <PaginationNext />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CurrencyPagination;
