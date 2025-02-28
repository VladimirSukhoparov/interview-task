import { useState, useEffect } from 'react';
import { List } from '../../components/List/List';
import { Data, Test } from '../../types';
import { Title } from '../../components/Title';

export const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:3100/tests');
      const json = await response.json();
      const newData = await Promise.all(
        json.map(async (el: Test) => {
          const response = await fetch(
            `http://localhost:3100/sites/${el.siteId}`
          );
          const siteData = await response.json();
          return {
            ...el,
            site: siteData.url.replace(
              /^(?:https?:\/\/)?(?:www\.)?|\/.*$/gi,
              ''
            ),
          };
        })
      );
      setLoading(false);
      setData(newData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData: Data[] = data.filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );
    setFilteredData(filteredData);
  }, [search, data]);

  return (
    <>
      <Title text='Dashboard' />
      <div className='custom-search'>
        <input
          type='text'
          placeholder='What test are you looking for?'
          className='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className='count'>{`${filteredData.length} tests`}</span>
      </div>

      {filteredData.length > 0 ? (
        <List items={filteredData} />
      ) : loading ? (
        <div className='loading'>
          <p className='text'>Loading...</p>
        </div>
      ) : (
        <div className='no-results'>
          <p className='text'>Your search did not match any results.</p>
          <button className='reset' onClick={() => setSearch('')}>
            Reset
          </button>
        </div>
      )}
    </>
  );
};
