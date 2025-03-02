import {
  useState,
  useEffect,
  ChangeEvent,
  useCallback,
  useMemo,
} from 'react';
import { List } from '../../components/List/List';
import { Data, Test } from '../../types';
import styles from './Dashboard.module.css';
import axios from 'axios';

export const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios('http://localhost:3100/tests');
        const newData = await Promise.all(
          data.map(async (el: Test) => {
            const { data } = await axios(
              `http://localhost:3100/sites/${el.siteId}`
            );
            return {
              ...el,
              site: data.url.replace(/^(?:https?:\/\/)?(?:www\.)?|\/.*$/gi, ''),
            };
          })
        );

        setData(newData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, data]);

  function debounce<T extends (...args: Parameters<T>) => void>(
    this: ThisParameterType<T>,
    fn: T,
    delay = 300
  ) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const debouncedSetSearchValue = debounce(setSearch, 200);

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    debouncedSetSearchValue(event.target.value);
  };

  const resetToDefault = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <>
      <h1 className={styles.title}>{'Dashboard'}</h1>
      <div className={styles.custom_search}>
        <input
          type='text'
          placeholder='What test are you looking for?'
          className={styles.search}
          onChange={handleValueChange}
        />
        <span className={styles.count}>{`${filteredData.length} tests`}</span>
      </div>

      {filteredData.length > 0 ? (
        <List items={filteredData} />
      ) : loading ? (
        <div className={styles.loading}>
          <p className={styles.text}>Loading...</p>
        </div>
      ) : (
        <div className={styles.no_results}>
          <p className={styles.text}>Your search did not match any results.</p>
          <button className={styles.reset} onClick={resetToDefault}>
            Reset
          </button>
        </div>
      )}
    </>
  );
};
