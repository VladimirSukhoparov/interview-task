import { useNavigate } from 'react-router-dom';
import { Data } from '../../types';
import styles from './ListItem.module.css';

export const ListItem = ({ name, type, status, site, id }: Data) => {
  const navigate = useNavigate();

  function lowerCase(str: string) {
    if (str === 'MVT') return str;
    if (str === 'SERVER_SIDE') return 'Server-side';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const statusStyles = new Map([
    ['ONLINE', styles.online],
    ['STOPPED', styles.stop],
    ['PAUSED', styles.paused],
  ]);
  
  const navigateToResults = () => {
    navigate(`/results/${id}`);
  };

  const navigateToFinalize = () => {
    navigate(`/finalize/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.type}>{lowerCase(type)}</div>
      <div className={`${styles.status} ${statusStyles.get(status) || ''}`}>
        {lowerCase(status)}
      </div>
      <div className={styles.site}>
        <p className={styles.site_title}>{site}</p>
        {status === 'DRAFT' ? (
          <button
            className={`${styles.site_btn} ${styles.finalize}`}
            onClick={navigateToFinalize}>
            Finalize
          </button>
        ) : (
          <button className={`${styles.site_btn}`} onClick={navigateToResults}>
            Results
          </button>
        )}
      </div>
    </div>
  );
};
