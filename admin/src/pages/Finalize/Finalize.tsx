import { useParams } from 'react-router-dom';
import { PagesWrapper } from '../../components/PagesWrapper';

export const Finalize = () => {
  const { testId } = useParams();

  return (
    <>
      <PagesWrapper testId={testId} title={'Finalize'}/>
    </>
  );
};
