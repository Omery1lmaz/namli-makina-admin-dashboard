import { useDispatch, useSelector } from 'react-redux';
import CardOne from '../../components/CardOne.tsx';
import {
  DashboardCategoriesTable,
  DashboardProductsTable,
  DashboardWaitersTable,
} from '../../components/TableOne.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminDashBoardInf } from '../../store/productSlices.ts';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography, getDialogContentTextUtilityClass } from '@mui/material';
import { getWaiters } from '../../store/waiterSlice.ts';
import { LinearIndeterminate } from '../../components/progressBar/linearProgressBar.tsx';

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

interface IFilterQuery {
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

const currentDate = new Date();
const currentDay = currentDate.getDay();
const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
const mondayDate = new Date(
  currentDate.setDate(currentDate.getDate() + mondayOffset)
);
mondayDate.setHours(0, 0, 0, 0);

const currentMonth = currentDate.getMonth();
const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
firstDayOfMonth.setHours(0, 0, 0, 0);

const filterDays = [
  {
    title: 'Bugün',
    date: {
      $gte: new Date(Date.now()),
    },
  },
  {
    title: 'Dün',
    date: {
      $gte: yesterday,
      $lt: new Date(),
    },
  },
  {
    title: 'Bu Hafta',
    date: {
      $gte: firstDayOfMonth,
    },
  },
];
const ECommerce = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-expect-error
  const { adminDashBoard, isLoadingP } = useSelector((state) => state.product);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<IFilterQuery>({
    date: filterDays[1].date,
  });
  const [open, setOpen] = useState(false);
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const filterDateHandle = (e: any) => {
    console.log(e.target.value);
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };
  const filterDateEndHandle = (e: any) => {
    setFilter({
      ...filter,
      date: { ...filter.date, $lte: new Date(e.target.value) },
    });
  };
  useEffect(() => {
    getData();
    // @ts-expect-error
    dispatch(getWaiters());
  }, []);
  let counter = 0;
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    counter++;
    if (adminDashBoard.products && counter == 0)
      for (let index = 0; index < 2; index++) {
        setProducts([...products, adminDashBoard.products[index]]);
      }
  }, [adminDashBoard]);
  const [value, setValue] = useState<any>({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  const getData = () => {
    // @ts-expect-error
    dispatch(getAdminDashBoardInf({ query: filter }));
  };
  useEffect(() => {
    getData();
  }, [filter]);

  return (
    <DefaultLayout>
      <div className="w-full p-2">
        <button
          className="flex items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          onClick={handleOpen}
        >
          Open modal
        </button>
      </div>
      <div className="mb-2 flex items-center justify-start gap-2">
        {filterDays.map((date: any, index: number) => {
          return (
            <div
              onClick={() => {
                setFilter({ ...filter, date: date.date });
              }}
              key={index}
              className="border-white  p-2 active:border-b"
            >
              {date.title}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne
          title={'Total Cost'}
          price={
            adminDashBoard.totalCost >= 0 ? (
              <span>{adminDashBoard.totalCost} TL</span>
            ) : (
              <LinearIndeterminate />
            )
          }
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Total Order'}
          price={
            adminDashBoard.totalOrder >= 0 ? (
              <span>{adminDashBoard.totalCost} TL</span>
            ) : (
              <LinearIndeterminate />
            )
          }
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Total Tip'}
          price={
            adminDashBoard.totalTipCost >= 0 ? (
              <span>{adminDashBoard.totalTipCost} TL</span>
            ) : (
              <LinearIndeterminate />
            )
          }
          icon={<BanknotesIcon />}
        />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          {<DashboardProductsTable />}
        </div>
        <div className="col-span-12 xl:col-span-6">
          {<DashboardCategoriesTable />}
        </div>
        <div className="col-span-12 xl:col-span-6">
          {<DashboardWaitersTable />}
        </div>
        {/* <div className="col-span-12 xl:col-span-6">
          <TableOne />
        </div> */}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/* <h2 className="text-lg font-medium">Filter</h2> */}
            Filter
          </Typography>
          <div className="d-flex flex-column justify-content-around w-100">
            <>
              <div className="d-flex justify-content-around w-100">
                <div className="d-flex">
                  <span>Start Date :</span>
                  <input type="date" onChange={filterDateHandle}></input>
                </div>
                <div className="d-flex">
                  <span className="mr-5">End Date :</span>
                  <input
                    className="ml-5"
                    type="date"
                    onChange={filterDateEndHandle}
                  ></input>
                </div>
              </div>
            </>
            <button
              className="flex items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
              onClick={getData}
            >
              Search
            </button>
          </div>
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default ECommerce;
