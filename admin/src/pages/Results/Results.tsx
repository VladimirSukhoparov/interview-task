import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { useEffect, useState } from 'react';
import ButtonBack from '../../components/ButtonBack/ButtonBack';

export const Results = () => {
  const { testId } = useParams();
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3100/tests/${testId}`);
      const data = await response.json();
      setName(data.name);
    };
    fetchData();
  }, [testId]);

  return (
    <div className='pages_container'>
      <div>
        <Title text='Results' />
        <p className='name'>{name}</p>
      </div>
      <ButtonBack />
    </div>
  );
};
