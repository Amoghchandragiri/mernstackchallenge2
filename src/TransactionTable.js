import React, { useState } from 'react';

const TransactionTable = ({ transactions, fetchTransactions }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchTransactions(e.target.value, 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
    fetchTransactions(search, page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
    fetchTransactions(search, page - 1);
  };

  return (
    <div>
      <input 
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search transactions..."
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionTable;
