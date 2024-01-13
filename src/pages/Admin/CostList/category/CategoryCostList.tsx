import { useEffect, useState } from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import { getAdminDashBoardInf } from '../../../../store/productSlices';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';


type filterQuery = {
  date?: {
    $lte?: Date;
    $gte?: Date;
  };
};

const CategoryCostList = () => {
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
      <Breadcrumb pageName="Category Cost List" />
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
            <p className="font-medium">Category Name</p>
          </div>
          <div className="col-span-1 flex items-center justify-center ">
            <p className="font-medium">Total Cost</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Total Price</p>
          </div>
        </div>

        {!isLoadingP &&
          adminDashBoard.categories?.map((category: any, key: number) => {
            return (
              <div
                key={key}
                className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {category.name}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {category.qty}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {category.cost} TL
                  </p>
                </div>
              </div>
            );
          })}
        {adminDashBoard.categories?.length == 0 && !isLoadingP && (
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

export default CategoryCostList;
