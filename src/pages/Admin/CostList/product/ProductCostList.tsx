import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  deleteCategoryById,
  getAdminDashBoardInf,
  getCatsBySeller,
} from '../../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: '15px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type filterQuery = {
  date?: {
    $lte?: Date;
    $gte?: Date;
  };
};

const ProductCostList = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { adminDashBoard, isLoadingP } = useSelector((state) => state.product);

  const [filterOpen, setFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [filter, setFilter] = useState<filterQuery>({});
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);

  const filterDateHandle = (e: any) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };
  const searchedProduct = adminDashBoard?.categories?.filter((item: any) => {
    if (searchTerm?.trim() === '') {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      console.log(item, 'item');
      return item;
    }
  });

  const filterDateEndHandle = (e: any) => {
    setFilter({
      ...filter,
      date: { ...filter.date, $lte: new Date(e.target.value) },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // @ts-expect-error
    dispatch(getAdminDashBoardInf({ query: filter }));
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product Cost List" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-2">
          <button
            onClick={() => {
              handleOpenFilter();
            }}
            className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          >
            Filter
          </button>
        </div>
        <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Product Name</p>
          </div>
          <div className="col-span-1 flex items-center justify-center ">
            <p className="font-medium">Total Cost</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Total Price</p>
          </div>
        </div>

        {!isLoadingP &&
          adminDashBoard.products?.map((product: any, key: number) => {
            return (
              <div
                key={key}
                className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {product.name}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {product.qty}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {product.cost} TL
                  </p>
                </div>
              </div>
            );
          })}
        {adminDashBoard.products?.length == 0 && !isLoadingP && (
          <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
            <h2 className="text-center text-lg font-semibold text-black dark:text-white">
              No Category
            </h2>
          </div>
        )}
        {isLoadingP && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
      </div>
      {/* Filter Modal */}
      <Modal
        open={filterOpen}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-gray-800 absolute left-2/4 top-2/4 h-49 w-1/4 translate-x-[-50%] translate-y-[-50%] rounded bg-graydark p-4 text-white">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are u sure to delete product
            <hr />
          </Typography>
          <Typography
            id="modal-modal-description"
            className="d-flex"
            sx={{ mt: 2 }}
          >
            <div className="d-flex flex-column justify-content-around w-full">
              <>
                <div className="d-flex justify-content-around h-full w-full flex-col">
                  <div className="flex ">
                    <span className="min-w-[85px]">Start Date :</span>
                    <input
                      type="date"
                      onChange={filterDateHandle}
                      className="ml-5 bg-transparent"
                    ></input>
                  </div>
                  <div className="flex ">
                    <span className="min-w-[85px]">End Date :</span>
                    <input
                      className="ml-5 bg-transparent"
                      type="date"
                      onChange={filterDateEndHandle}
                    ></input>
                  </div>
                </div>
              </>
              <button
                className="mt-3 flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray px-5 py-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                onClick={getData}
              >
                Search
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
      {/* Filter Modal End */}
    </DefaultLayout>
  );
};

export default ProductCostList;
