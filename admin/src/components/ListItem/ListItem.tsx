import { useNavigate } from 'react-router-dom';
import { Data } from '../../types';
import styles from './ListItem.module.css';

export const ListItem = ({ name, type, status, site, siteId }: Data) => {
  const navigate = useNavigate();
  function lowerCase(str: string) {
    let result = '';
    if (str === 'MVT') return str;
    if (str === 'SERVER_SIDE') return 'Server-side';

    for (let i = 0; i < str.length; i++) {
      if (i === 0) result += str[i].toUpperCase();
      else result += str[i].toLowerCase();
    }
    return result;
  }

  const navigateToResults = () => {
    navigate(`/results/${siteId}`);
  };
  const navigateToFinalize = () => {
    navigate(`/finalize/${siteId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.name}>{name}</div>
      <div className={styles.type}>{lowerCase(type)}</div>
      <div
        className={`${styles.status} ${
          status === 'ONLINE'
            ? styles.online
            : status === 'STOPPED'
            ? styles.stop
            : status === 'PAUSED'
            ? styles.paused
            : ''
        }`}>
        {lowerCase(status)}
      </div>
      <div className={styles.site}>
        <p className={styles.site_title}>
          {site}
        </p>
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
