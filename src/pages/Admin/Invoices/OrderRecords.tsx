import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardOne from '../../../components/CardOne';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';

import { getOrderRecords } from '../../../store/productSlices';
type filterQuery = {
  date?: {
    $lte?: Date;
    $gte?: Date;
  };
};

const OrderRecords = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalOrderAmount, setTotalOrderAmount] = useState<number>(0);
  const [totalOrderCount, setTotalOrderCount] = useState<number>(0);
  const [totalCommission, setTotalCommission] = useState<any>(0);
  const [totalCancelledOrderAmount, setTotalCancelledOrderAmount] =
    useState<number>(0);

  const { orderRecords } = useSelector((state: any) => state.product);
  const { user } = useSelector((state: any) => state.auth);
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [filter, setFilter] = useState<filterQuery>({
    date: {
      $gte: today,
      $lte: endOfDay,
    },
  });
  const handle = (order: any) => {
    // İki ayrı sheet için verileri çalışma sayfalarına dönüştürün
    console.log(order, 'order');
    const totalOrderAmount = order.totalAmount - order.totalCancelledAmount;

    const totalCommission =
      ((order.totalAmount - order.totalCancelledAmount) *
        user.commissionPercentage) /
      100;

    const totalVested =
      order.totalAmount - order.totalCancelledAmount - totalCommission;
    const t = order.orders.map((i: any) => {
      console.log(i, 'i');
      const commission = (i.totalPrice * user?.commissionPercentage) / 100;
      const hakedis = i.totalPrice - commission;
      return [
        `${new Date(i.date).getDate()}.${new Date(
          i.date
        ).getMonth()}.${new Date(i.date).getFullYear()} ${new Date(
          i.date
        ).getHours()}:${new Date(i.date).getMinutes()}`,
        i.isReady,
        i.name,
        i.totalPrice,
        i.shippingAddress?.table,
        commission,
        hakedis,
      ];
    });
    console.log(t, 't');
    const text = [
      [
        'Sipariş Tarihi',
        'Toplam Sipariş Tutarı',
        'Toplam Sipariş Adeti',
        'Toplam İptal Edilen Sipariş Tutarı',
      ],
      [
        order.date,
        order.totalAmount,
        order.totalOrders,
        order.totalCancelledAmount,
      ],
    ];
    const text2 = [
      [
        'Sipariş Tarihi',
        'Statü',
        'Müşteri',
        'Tutar',
        'Masa',
        'Komisyon',
        'Hakediş',
      ],
      ...t,
      ['Toplam Hakediş', 'Toplam Tutar', 'Toplam komisyon'],
      [totalVested, totalOrderAmount, totalCommission],
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(text);
    const ws2 = XLSX.utils.aoa_to_sheet(text2);

    // Yeni bir çalışma kitabı (workbook) oluşturun
    const wb = XLSX.utils.book_new();

    // İki sheet'i çalışma kitabına ekleyin
    XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');
    XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');

    // Dosyayı yazın ve indirin
    XLSX.writeFile(wb, 'myexcel.xlsx');
  };
  const filterDateHandle = (e: any) => {
    const newStartDate = new Date(e.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      date: {
        ...prevFilter.date,
        $gte: newStartDate,
      },
    }));
  };

  const filterDateEndHandle = (e: any) => {
    const newEndDate = new Date(e.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      date: {
        ...prevFilter.date,
        $lte: newEndDate,
      },
    }));
  };

  const getOrders = () => {
    dispatch(
      // @ts-expect-error
      getOrderRecords({
        query: filter,
      })
    );
  };

  useEffect(() => {
    let tAmount = 0;
    let tOrderCount = 0;
    let tCancelledOrderAmount = 0;

    if (orderRecords && Array.isArray(orderRecords)) {
      orderRecords.map((order: any) => {
        tAmount += order.totalAmount;
        tOrderCount += order.totalOrders;
        tCancelledOrderAmount += order.totalCancelledAmount;
      });
    }
    const t = (tAmount * user?.commissionPercentage) / 100;
    setTotalOrderAmount(tAmount);
    setTotalOrderCount(tOrderCount);
    setTotalCancelledOrderAmount(tCancelledOrderAmount);
    setTotalCommission((tAmount * user?.commissionPercentage) / 100);
  }, [orderRecords]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sipariş Kayıtları" />
      <div className="my-4 flex items-center justify-between rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex w-3/4 items-center justify-start">
          <div className="w-1/4">
            <label className="mb-2.5 block text-black dark:text-white">
              Başlangıç tarihi
            </label>
            <input
              className="rounded-md border-2	 bg-transparent p-2 dark:text-white "
              type="date"
              value={
                filter?.date?.$gte
                  ? filter.date.$gte.toISOString().split('T')[0]
                  : ''
              }
              onChange={filterDateHandle}
            />
          </div>
          <div className="w-1/4 ">
            <label className="mb-2.5 block text-black dark:text-white">
              Bitiş tarihi
            </label>
            <input
              className="rounded-md border-2 bg-transparent p-2 dark:text-white "
              type="date"
              value={
                filter?.date?.$lte
                  ? filter.date.$lte.toISOString().split('T')[0]
                  : ''
              }
              onChange={filterDateEndHandle}
            />
          </div>
        </div>
        <button
          onClick={getOrders}
          className="flex h-full items-center justify-center rounded-lg border border-stroke bg-gray py-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Filtrele
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5 2xl:gap-7.5">
        <CardOne
          title={'Toplam Sipariş'}
          price={`${totalOrderAmount} TL`}
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Toplam Satış'}
          price={`${totalOrderCount} Adet`}
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Toplam Komisyon'}
          price={`${totalCommission} TL`}
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Toplam İade'}
          price={`${totalCancelledOrderAmount} TL`}
          icon={<BanknotesIcon />}
        />
        <CardOne
          title={'Toplam Hakediş'}
          price={`${
            totalOrderAmount - totalCancelledOrderAmount - totalCommission
          } TL`}
          icon={<BanknotesIcon />}
        />
      </div>
      <div className="my-4 flex flex-col gap-3 ">
        {orderRecords.map((order: any) => {
          return (
            <div className="m-0 flex  justify-between rounded-md py-4 px-0 dark:border-strokedark dark:bg-boxdark sm:px-7.5">
              <div className="text-lg">{order.date} Tarihli Siparişler </div>
              <div className="flex items-center gap-2 text-lg">
                <div>Toplam Sipariş {order.totalAmount}</div>
                <div className="text-2xl dark:text-white">|</div>
                <div> Toplam Sipariş {order.totalOrders}</div>
                <div>
                  <button
                    className="flex h-full items-center justify-center rounded-lg border border-stroke bg-meta-3 py-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-3 dark:text-white dark:hover:bg-opacity-50"
                    onClick={() => handle(order)}
                  >
                    Excel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Render the hidden table for export */}
    </DefaultLayout>
  );
};

export default OrderRecords;
