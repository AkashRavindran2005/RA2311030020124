export default function Filters({ typeFilter, setTypeFilter, topN, setTopN }) {
  return (
    <div className="filters-bar" id="filters-bar">
      <div className="filter-group">
        <label htmlFor="type-filter">Type:</label>
        <select
          id="type-filter"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Placement">Placement</option>
          <option value="Event">Event</option>
          <option value="Result">Result</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="top-n">Show Top:</label>
        <select
          id="top-n"
          value={topN}
          onChange={(e) => setTopN(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
