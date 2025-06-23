"use client";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CustomPaginationItem } from "@/components/CustomPaginationItem";
import { useRouter, useSearchParams } from "next/navigation";

const PHOTOS_PER_PAGE = 20;
// This is pretty dirty approach, but went for simplicity here.
// Because we know how many photos API data has, so we can determine
// easily how many pages we have (or need) based on how many images
// we want to show per page to the user. Obviously, in real case
// the total pages would be dynamic as we cant predict how many
// photos there going to be tomorrow, next week etc.
const TOTAL_PHOTOS = 5000;
const TOTAL_PAGES = Math.ceil(TOTAL_PHOTOS / PHOTOS_PER_PAGE);

function getPageNumbers(current: number, total: number) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l: number | undefined = undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}

export function CustomPagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  const pageNumbers = getPageNumbers(currentPage, TOTAL_PAGES);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {
          pageNumbers.map((num, idx) => {
            return (
              <CustomPaginationItem
                key={idx}
                num={num}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            );
          })
        }
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage >= TOTAL_PAGES ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
