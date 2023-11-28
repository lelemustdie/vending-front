
import React, { useEffect, useState } from 'react';
import './vending.css';

const Vending = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterTopic, setFilterTopic] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/vending');
                const result = await response.json();
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilter = () => {
        const filtered = data.filter((item) => item.topic.includes(filterTopic));
        setFilteredData(filtered);
    };

    const handleSort = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredData(sortedData);
    };

    return (
        <div className="vending-container">
            <h1>Vending Data</h1>
            <div className="filter-input">
                <label>Topic Filter: </label>
                <input type="text" value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)} />
            </div>
            <div className="button-group">
                <button onClick={handleFilter}>Apply Filters</button>
                <button onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}>
                    Toggle Sort Order: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
                </button>
                <button onClick={handleSort}>Apply Sort</button>
            </div>
            <ul className="data-list">
                {filteredData.map((item) => (
                    <li key={item._id} className="data-item">
                        <p>Topic: {item.topic}</p>
                        <p>Message: {item.message}</p>
                        <p>Date: {new Date(item.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Vending;
