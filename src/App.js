import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TransactionTable from './TransactionTable';
import TransactionStatistics from './TransactionStatistics';
import TransactionBarChart from './TransactionBarChart';

const App = () => {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  const fetchTransactions = useCallback(async (search = '', page = 1, perPage = 10) => {
    const response = await axios.get(`http://localhost:3000/api/transactions`, {
      params: { month, search, page, perPage }
    });
    setTransactions(response.data.transactions);
  }, [month]);

  const fetchStatistics = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/api/statistics`, {
      params: { month }
    });
    setStatistics(response.data);
  }, [month]);

  const fetchBarChartData = useCallback(async () => {
    const response = await axios.get(`http://localhost:3000/api/bar-chart`, {
      params: { month }
    });
    setBarChartData(response.data);
  }, [month]);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [fetchTransactions, fetchStatistics, fetchBarChartData]);

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <TransactionTable transactions={transactions} fetchTransactions={fetchTransactions} />
      <TransactionStatistics statistics={statistics} />
      <TransactionBarChart data={barChartData} />
    </div>
  );
};

export default App;
