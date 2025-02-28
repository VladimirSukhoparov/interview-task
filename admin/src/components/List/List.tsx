import { useEffect, useState } from 'react';
import { Data } from '../../types';
import { ListItem } from '../ListItem';
import styles from './List.module.css';

export const List = ({ items }: { items: Data[] | [] }) => {
  const [sortedItems, setSortedItems] = useState<Data[]>([]);
  const [isAscending, setIsAscending] = useState<string>('');

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const sortBy = (prop: keyof Data) => {
    const sorted = [...sortedItems].sort((a, b) => {
      if (prop === 'status') {
        const statusOrder = ['DRAFT', 'STOPPED', 'PAUSED', 'ONLINE'];
        return (
          (statusOrder.indexOf(a[prop]) - statusOrder.indexOf(b[prop])) *
          (isAscending === prop ? -1 : 1)
        );
      }
      if (a[prop] < b[prop]) return isAscending ? -1 : 1;
      if (a[prop] > b[prop]) return isAscending ? 1 : -1;
      return 0;
    });
    setSortedItems(sorted);
    if (isAscending) {
      setIsAscending('');
    } else {
      setIsAscending(prop);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={`${styles.title} ${styles.name}`}
          onClick={() => sortBy('name')}>
          NAME
          <span
            className={`${styles.chevron} ${
              isAscending === 'name' ? styles['chevron-down'] : ''
            }`}></span>
        </div>
        <div className={styles.title} onClick={() => sortBy('type')}>
          TYPE
          <span
            className={`${styles.chevron} ${
              isAscending === 'type' ? styles['chevron-down'] : ''
            }`}></span>
        </div>
        <div className={styles.title} onClick={() => sortBy('status')}>
          STATUS
          <span
            className={`${styles.chevron} ${
              isAscending === 'status' ? styles['chevron-down'] : ''
            }`}></span>
        </div>
        <div className={styles.title} onClick={() => sortBy('site')}>
          SITE
          <span
            className={`${styles.chevron} ${
              isAscending === 'siteId' ? styles['chevron-down'] : ''
            }`}></span>
        </div>
      </div>
      {sortedItems.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </>
  );
};
