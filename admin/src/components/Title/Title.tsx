import styles from './Title.module.css';

interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return <h1 className={styles.title}>{text}</h1>;
};
