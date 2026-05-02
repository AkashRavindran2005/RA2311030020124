import { useState, useEffect } from 'react';
import { getToken, fetchNotifications, sortNotifications, sendLog } from './api.js';
import Filters from './components/Filters.jsx';
import NotificationList from './components/NotificationList.jsx';
import Pagination from './components/Pagination.jsx';

const ITEMS_PER_PAGE = 5;

export default function App() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('All');
  const [topN, setTopN] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const authToken = await getToken();
        setToken(authToken);

        const raw = await fetchNotifications(authToken);

        const sorted = sortNotifications(raw);
        setAllNotifications(sorted);

        await sendLog(authToken, 'info', 'Sorting completed');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      sendLog(token, 'info', `Filter changed: type=${typeFilter}, topN=${topN}`);
    }
    setCurrentPage(1);
  }, [typeFilter, topN]);

  useEffect(() => {
    if (token) {
      sendLog(token, 'info', `Page changed: ${currentPage}`);
    }
  }, [currentPage]);


  const filtered = typeFilter === 'All'
    ? allNotifications
    : allNotifications.filter((n) => {
      const type = n.type || n.Type;
      return type === typeFilter;
    });

  const topItems = filtered.slice(0, topN);

  const totalPages = Math.max(1, Math.ceil(topItems.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = topItems.slice(startIdx, startIdx + ITEMS_PER_PAGE);


  if (loading) {
    return (
      <div className="app-container">
        <div className="status-message loading">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="status-message error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Notification Dashboard</h1>
        <p>Sorted by priority (Placement → Event → Result), then by recency</p>
      </header>

      <Filters
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        topN={topN}
        setTopN={setTopN}
      />

      <div className="summary">
        <span>
          Showing {pageItems.length} of {topItems.length} notifications
          {typeFilter !== 'All' ? ` (${typeFilter})` : ''}
        </span>
        <span>Top {topN} selected</span>
      </div>

      <NotificationList notifications={pageItems} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
