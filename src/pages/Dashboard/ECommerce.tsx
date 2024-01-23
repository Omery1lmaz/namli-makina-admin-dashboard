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
import {
  getAdminDashBoardInf,
  getOfficer,
  getUsers,
} from '../../store/productSlices.ts';
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
  // @ts-expect-error
  const { users } = useSelector((state) => state.product);

  const getData = () => {
    // @ts-expect-error
    dispatch(getUsers());
    // @ts-expect-error
    dispatch(getOfficer());
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 gap-6 xl:col-span-6">
          {<DashboardProductsTable />}
          <div className="m-3"></div>
          {<DashboardCategoriesTable />}
        </div>
        {/* <div className="col-span-12 xl:col-span-6">
          <TableOne />
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
