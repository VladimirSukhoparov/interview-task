import { useParams } from 'react-router-dom';
import { Title } from '../../components/Title';
import { useEffect, useState } from 'react';
import ButtonBack from '../../components/ButtonBack/ButtonBack';

export const Finalize = () => {
  const { testId } = useParams();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:3100/tests/${testId}`);
      const data = await response.json();
      setName(data.name);
    };
    setLoading(false);
    fetchData();
  }, [testId]);

  return (
    <div className='pages_container'>
      <div>
        <Title text='Finalize' />
        <p className='name'>{loading ? 'Loading...' : name}</p>
      </div>
      <ButtonBack />
    </div>
  );
};
