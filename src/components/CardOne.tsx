import { LinearIndeterminate } from './progressBar/linearProgressBar';
import { useEffect } from 'react';
const CardOne = ({ title, price, icon }: any) => {
  useEffect(() => {
    console.log(price == 'undefined');
  }, [title, price, icon]);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {typeof icon !== null ||
        typeof icon !== undefined ||
        icon !== 'undefined' ? (
          icon
        ) : (
          <LinearIndeterminate />
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {price}
          </h4>
          <span className="text-sm font-medium">
            {typeof title !== null ||
            typeof title !== undefined ||
            title !== 'undefined' ? (
              title
            ) : (
              <LinearIndeterminate />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
