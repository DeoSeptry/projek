import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TablePagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}) {
  const startResult = (currentPage - 1) * 10 + 1;
  const endResult = Math.min(currentPage * 10, totalResults);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border border-gray-200 rounded-lg">
      {/* Results Info */}
      <div className="text-sm text-gray-700">
        Menampilkan{' '}
        <span className="font-medium">{startResult}</span> -{' '}
        <span className="font-medium">{endResult}</span> dari{' '}
        <span className="font-medium">{totalResults}</span> hasil
      </div>

      {/* Pagination Controls - Always show */}
      <nav aria-label="Page navigation">
        <ul className="flex -space-x-px text-sm">
          {/* Previous Button */}
          <li>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex items-center justify-center gap-1 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm font-medium leading-5 rounded-s-lg text-sm px-3 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <li key={`ellipsis-${index}`}>
                  <span className="flex items-center justify-center text-gray-700 bg-white border border-gray-300 font-medium leading-5 text-sm w-9 h-9">
                    ...
                  </span>
                </li>
              );
            }

            const isActive = page === currentPage;

            return (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => handlePageClick(page)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center justify-center font-medium text-sm w-9 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm'
                  }`}
                >
                  {page}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          <li>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center gap-1 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm font-medium leading-5 rounded-e-lg text-sm px-3 h-9 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}