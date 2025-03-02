import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './PagesWrapper.module.css';
import { useNavigate } from 'react-router-dom';

export const PagesWrapper = ({
  testId,
  title,
}: {
  testId: string | undefined;
  title: string;
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigateToBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios(`http://localhost:3100/tests/${testId}`);
        setName(result.data.name);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [testId]);

  return (
    <div className={styles.pages_container}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.name}>{loading ? 'Loading...' : name}</p>
      </div>
      <div className={styles.btn} onClick={navigateToBack}>
        <span className={`${styles.chevron}`}></span>
        Back
      </div>
    </div>
  );
};
