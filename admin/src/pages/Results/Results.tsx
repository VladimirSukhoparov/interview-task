import { useParams } from 'react-router-dom';

import { PagesWrapper } from '../../components/PagesWrapper/PagesWrapper';

export const Results = () => {
  const { testId } = useParams();

  return (
    <>
      <PagesWrapper testId={testId}  title={'Results'}/>
    </>
  );
};
