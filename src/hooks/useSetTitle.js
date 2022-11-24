import { useEffect } from 'react';

const useSetTitle = (title) => {
  useEffect(() => {
    document.title = `HomeTech - ${title}`;
  }, [title]);
};

export default useSetTitle;
