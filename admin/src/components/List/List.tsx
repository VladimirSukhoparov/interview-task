import { memo, useEffect, useState } from 'react';
import { Data } from '../../types';
import { ListItem } from '../ListItem';
import styles from './List.module.css';

export const List = memo(({ items }: { items: Data[] | [] }) => {
  const [sortedItems, setSortedItems] = useState<Data[]>([]);
  const [isAscending, setIsAscending] = useState<string>('');

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const statusOrder = ['DRAFT', 'STOPPED', 'PAUSED', 'ONLINE'];

  const sortBy = (prop: keyof Data) => {
    const sorted = [...sortedItems].sort((a, b) => {
      if (prop === 'status') {
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
        <div className={`${styles.title} ${styles.name}`}>
          <span
            className={`${styles.chevron} ${
              isAscending === 'name' ? styles['chevron-down'] : ''
            }`}
            onClick={() => sortBy('name')}>
            NAME
          </span>
        </div>
        <div className={styles.title}>
          <span
            className={`${styles.chevron} ${
              isAscending === 'type' ? styles['chevron-down'] : ''
            }`}
            onClick={() => sortBy('type')}>
            TYPE
          </span>
        </div>
        <div className={styles.title}>
          <span
            className={`${styles.chevron} ${
              isAscending === 'status' ? styles['chevron-down'] : ''
            }`}
            onClick={() => sortBy('status')}>
            STATUS
          </span>
        </div>
        <div className={styles.title}>
          <span
            className={`${styles.chevron} ${
              isAscending === 'site' ? styles['chevron-down'] : ''
            }`}
            onClick={() => sortBy('site')}>
            SITE
          </span>
        </div>
      </div>
      {sortedItems.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </>
  );
});
