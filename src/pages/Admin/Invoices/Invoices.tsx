import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getInvoicesRecords,
  getOrderRecords,
} from '../../../store/productSlices';
type filterQuery = {
  date?: {
    $lte?: Date;
    $gte?: Date;
  };
};

const Invoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderRecords, invoices, isLoadingP } = useSelector(
    (state: any) => state.product
  );
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

  const getInvoices = () => {
    dispatch(
      // @ts-expect-error
      getInvoicesRecords({
        query: filter,
      })
    );
  };
  useEffect(() => {
    getInvoices();
  }, []);
  const downloadFile = (fileURL: string, fileName: string) => {
    var fileURL =
      'https://storage.googleapis.com/bitiklaisparis/SaticiFatura_26.07.2023-02.35.pdf';

    // Yeni bir XMLHttpRequest nesnesi oluşturuyoruz
    var xhr = new XMLHttpRequest();
    xhr.open('GET', fileURL, true);
    xhr.responseType = 'blob'; // binary data olarak istiyoruz
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Dosya indirme işlemini gerçekleştiriyoruz
        var blob = new Blob([xhr.response], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'SaticiFatura_26.07.2023-02.35.pdf';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        // Artık a etiketini ve URL'yi temizleyebiliriz
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    };
    xhr.send();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Faturalar" />
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
          onClick={getInvoices}
          className="flex h-full items-center justify-center rounded-lg border border-stroke bg-gray py-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Filtrele
        </button>
      </div>
      <div className="my-4  rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
          <div className="col-span-3 flex items-center">
            <p className="font-medium">Fatura No</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Fatura Tipi</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Fatura Tarihi</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Fatura Tutarı</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">İşlemler</p>
          </div>
        </div>
        {!isLoadingP && invoices.length == 0 && !invoices[0]?.invoiceNo && (
          <div className="flex items-center justify-center p-5 text-lg font-semibold">
            <h2>Fatura Yok</h2>
          </div>
        )}
        {!isLoadingP &&
          invoices?.map((invoice: any, key: number) => {
            const date = new Date(invoice.date).toISOString().split('T')[0];
            return (
              <div
                key={key}
                className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="max-w-[250px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                      {invoice.invoiceNo}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm dark:text-white">{invoice.name}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm dark:text-white">{date} </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-sm dark:text-white">{invoice.amount} TL</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <button
                    onClick={() => {
                      downloadFile(
                        invoice.invoice,
                        `satıcı fatura ${invoice.invoiceNo}`
                      );
                    }}
                    className="flex h-full items-center justify-center rounded-lg border border-stroke bg-meta-3 py-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-3 dark:text-white dark:hover:bg-opacity-50"
                  >
                    İndir
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Render the hidden table for export */}
    </DefaultLayout>
  );
};

export default Invoices;
