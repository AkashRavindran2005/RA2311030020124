export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination" id="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        ← Prev
      </button>
      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next →
      </button>
    </div>
  );
}
