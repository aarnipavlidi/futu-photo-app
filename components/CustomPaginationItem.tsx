import { PaginationItem } from "@/components/ui/pagination";

interface CustomPaginationItemProps {
  num: string | number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export function CustomPaginationItem(props: CustomPaginationItemProps) {
  const { num, currentPage, handlePageChange } = props;

  return (
    <PaginationItem>
      {
        num === '...' && (
          <span className="px-2 text-neutral-500">...</span>
        )
      }
      {
        num !== '...' && (
          <button
            onClick={() => handlePageChange(Number(num))}
            className={`px-3 py-1 rounded ${currentPage === num ? 'bg-neutral-50 border shadow text-neutral-900' : 'hover:bg-neutral-100'} ${currentPage === num ? '' : 'text-neutral-700'}`}
            disabled={currentPage === num}
          >
            {num}
          </button>
        )
      }
    </PaginationItem>
  );
};