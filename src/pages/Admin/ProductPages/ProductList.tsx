import React, { useEffect } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../store/productSlices';
import CircularProgress from '@mui/joy/CircularProgress';

const ProductList = () => {
  const dispatch = useDispatch();

  // @ts-expect-error
  const { isLoadingP, users } = useSelector((state) => state.product);
  const getProducts = () => {
    // @ts-expect-error
    dispatch(getUsers());
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="User List" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">User Name</p>
          </div>
          <div className="col-span-2 items-center sm:flex">
            <p className="font-medium">Scoree</p>
          </div>
        </div>

        {!isLoadingP &&
          users?.map((product: any, key: number) => {
            return (
              <div
                key={key}
                className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="max-w-[250px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                      {product.name}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="max-w-[250px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                      {product.scoree}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        {users?.length == 0 && !isLoadingP && (
          <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
            <h2 className="text-center text-lg font-semibold text-black dark:text-white">
              No Product
            </h2>
          </div>
        )}
        {isLoadingP && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductList;
