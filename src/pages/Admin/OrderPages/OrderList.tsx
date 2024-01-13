import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  getOrderBySeller,
  getOrderBySellerWithLimit,
  updateOrderStatus,
} from '../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';

interface Item {
  name: string;
  qty: number;
  image: string;
  price: number;
  variation: any[];
  promotion: null | any;
  product: string;
  _id: string;
}

interface Seller {
  _id: string;
  name: string;
}

interface ShippingAddress {
  table: string;
}

interface Order {
  shippingAddress: ShippingAddress;
  _id: string;
  orderMessage: string;
  name: string;
  user: string;
  seller: Seller;
  items: Item[];
  isReady: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  takeAway: boolean;
  Tip: string[];
  date: string;
  __v: number;
}

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

const pageLimitOptions = [
  { label: 10, value: 10 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
];

const statues = [
  { label: 'Not Started', value: 'Not Started' },
  { label: 'InProgress', value: 'InProgress' },
  { label: 'Ready', value: 'Ready' },
];

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const [open, setOpen] = useState(false);
  const [openOrderDetailModal, setOpenOrderDetailModal] = useState(false);
  const [vOrders, setVOrders] = useState<[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    isReady: { $in: ['Delivered', 'Cancel'] },
  });
  const [limit, setLimit] = useState(10);
  const handleOpen = () => setOpen(true);
  const handleOpenFilter = () => setFilterOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseODetailModal = () => setOpenOrderDetailModal(false);
  const handleOpenODetailModal = () => setOpenOrderDetailModal(true);
  const handleCloseFilter = () => setFilterOpen(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filterStatusHandle = (e: any) => {
    setFilter({ ...filter, isReady: e.target.value });
  };
  const filterDateHandle = (e: any) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };

  //@ts-expect-error
  let { orders, isLoadingP } = useSelector((state) => state.product);
  const getOrders = () => {
    const intActivePAge = activePage - 1;
    dispatch(
      // @ts-expect-error
      getOrderBySellerWithLimit({
        skip: intActivePAge * limit,
        limit,
        query: filter,
      })
    );
  };
  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  useEffect(() => {
    page && setActivePage(parseInt(page));
    parseInt(page as string) === activePage
      ? getOrders()
      : setActivePage(parseInt(page as string));
  }, []);

  useEffect(() => {
    parseInt(page as string) <= 0 && navigate('/order-list/1');
    setActivePage(1);
  }, []);
  useEffect(() => {
    getOrders();
    navigate(`/order-list/${activePage}`);
  }, [activePage]);
  const pageLimitHandlechange = (e: any) => {
    setLimit(e.target.value);
  };

  useEffect(() => {
    getOrders();
  }, [limit]);
  const handleupdateStatusOrder = (status: any) => {
    if (selectedOrder) {
      const index = orders.findIndex(
        // @ts-expect-error
        (item: any, index: number) => item._id === selectedOrder?._id
      );
      console.log(index);
      let copyOrders = [...orders];
      let copyV = orders[index];
      copyV = { ...copyV, isReady: status };
      console.log(copyV);
      copyOrders[index] = copyV;

      console.log(copyOrders[index], 'copy order');

      orders = [...copyOrders];
      setOrders();
    }
  };
  const setOrders = () => {
    setVOrders(orders);
  };
  useEffect(() => {
    setOrders();
  }, [orders]);
  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order List" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="my-3 flex w-full items-center justify-start gap-3">
          <div className="flex items-center justify-start gap-1">
            <label className="block text-black dark:text-white">
              Select Limit:
            </label>
            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                onChange={pageLimitHandlechange}
                value={limit}
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              >
                {pageLimitOptions.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              handleOpenFilter();
            }}
            className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
          >
            Filter
          </button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Date
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Table
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Ago
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoadingP &&
                vOrders?.map((order: any, index: number) => {
                  let date = new Date(order.date);

                  let day = date.getDate(); // gün
                  let month = date.getMonth() + 1; // ay (0-11 arası olduğu için 1 ekliyoruz)
                  let year = date.getFullYear(); // yıl
                  let hour = date.getHours(); // saat
                  let minute = date.getMinutes(); // dakika
                  let second = date.getSeconds(); // saniye
                  const time =
                    day +
                    '.' +
                    month +
                    '.' +
                    year +
                    ' ' +
                    hour +
                    ':' +
                    minute +
                    ':' +
                    second;

                  return (
                    <>
                      <tr>
                        <td
                          key={index}
                          className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11"
                        >
                          <h5 className="font-medium text-black dark:text-white">
                            {time}
                          </h5>
                          <p className="text-sm">{order.totalPrice} TL</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {order.name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {order.shippingAddress.table}
                          </p>
                          {/* <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                        Paid
                      </p> */}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {moment(order.date).fromNow()}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {order.isReady}
                        </td>
                        <td className="flex gap-1 border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <button
                            onClick={() => {
                              handleOpen();
                            }}
                            className="z-99 flex items-center justify-center rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                          >
                            Change Status
                          </button>
                          <button
                            onClick={() => {
                              handleOpenODetailModal();
                              setSelectedOrder(order);
                            }}
                            className="z-99 flex items-center justify-center rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                          >
                            Detay
                          </button>
                        </td>
                      </tr>

                      <Modal
                        open={openOrderDetailModal}
                        onClose={handleCloseODetailModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div className="absolute left-2/4 top-2/4 h-3/4 w-2/4 translate-x-[-50%] translate-y-[-50%] rounded bg-meta-2 p-4 text-white dark:bg-meta-4">
                          <h3 className="text-lg font-medium">Order Detail</h3>
                          <hr className="my-2"></hr>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-normal">
                              <span className="font-medium">Order Owner: </span>
                              {order?.name}
                            </span>
                            <span className="text-sm font-normal">
                              <span className="font-medium">Order Cost: </span>
                              {order?.totalPrice}
                            </span>
                            <span className="text-sm font-normal">
                              <span className="font-medium">Order Table: </span>
                              {order?.shippingAddress.table}
                            </span>
                            <span className="text-sm font-normal">
                              <span className="font-medium">
                                Order Message:{' '}
                              </span>
                              {order?.orderMessage}
                            </span>
                            <hr className="my-2"></hr>
                          </div>
                          <div>
                            <h2 className="text-lg font-medium ">Products</h2>
                            <div className="max-h-[40vh] overflow-y-auto">
                              {order?.items.map((product: any) => {
                                return (
                                  <div className="border-gray-50 my-2 flex flex-col gap-1 rounded border p-2">
                                    <span className="text-sm font-medium">
                                      Product Name: <span>{product?.name}</span>
                                    </span>
                                    <span className="text-sm font-medium">
                                      Quantity: <span>{product?.qty}</span>
                                    </span>
                                    {Array.isArray(product.promotion) && (
                                      <div>
                                        <span className="text-sm font-medium">
                                          Promotions:{' '}
                                        </span>
                                        {product?.promotion.map((i: any) =>
                                          i.products.map((v: any) => (
                                            <span>{`${v.name} `}</span>
                                          ))
                                        )}
                                      </div>
                                    )}
                                    {Array.isArray(product?.variation) &&
                                      product.variation[0] && (
                                        <div>
                                          <span className="text-sm font-medium">
                                            Variations:
                                          </span>
                                          {product?.variation.map(
                                            (i: any) => (
                                              // i.product.map((v: any) => (
                                              <span>{`${i.product.name} `}</span>
                                            )
                                            // ))
                                          )}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </Modal>
                      <div>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <div className="bg-gray-800 absolute left-2/4 top-2/4 h-32 w-2/4 translate-x-[-50%] translate-y-[-50%] rounded bg-graydark p-4 text-white">
                            <h3 className="text-lg font-medium">
                              Change Order Status
                            </h3>
                            <hr className="my-3"></hr>
                            <div className="flex items-center justify-evenly gap-1">
                              <button
                                onClick={() => {
                                  dispatch(
                                    // @ts-expect-error
                                    updateOrderStatus({
                                      id: order._id,
                                      status: 'Not Started',
                                    })
                                  );
                                  handleupdateStatusOrder('Not Started');
                                  handleClose();
                                }}
                                className="!linear bg-green-600 text-brand-500 hover:bg-gray-100 active:bg-gray-200 z-[1] flex items-center  justify-center rounded-lg p-2 px-4 !transition !duration-200  dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                              >
                                <span className="text-sm font-medium">
                                  Not Started
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  dispatch(
                                    // @ts-expect-error
                                    updateOrderStatus({
                                      id: order?._id,
                                      status: 'InProgress',
                                    })
                                  );
                                  handleupdateStatusOrder('InProgress');
                                  handleClose();
                                }}
                                className="!linear bg-yellow-500 text-brand-500 hover:bg-gray-100 active:bg-gray-200 z-[1] flex items-center  justify-center rounded-lg p-2 px-4 !transition !duration-200  dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                              >
                                <span className="text-sm font-medium">
                                  In Progress
                                </span>
                              </button>
                              <button
                                onClick={() => {
                                  console.log(order._id);
                                  dispatch(
                                    // @ts-expect-error
                                    updateOrderStatus({
                                      id: order._id,
                                      status: 'Ready',
                                    })
                                  );
                                  handleupdateStatusOrder('Ready');
                                  handleClose();
                                }}
                                className="!linear bg-red-500 text-brand-500 hover:bg-gray-100 active:bg-gray-200 z-[1] flex items-center justify-center rounded-lg p-2 px-4 !transition !duration-200  dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
                              >
                                <span className="text-sm font-medium">
                                  Ready
                                </span>
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </>
                  );
                })}
            </tbody>
          </table>
          {vOrders.length == 0 && !isLoadingP && (
            <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
              <h2 className="text-center text-lg font-semibold text-black dark:text-white">
                No Order
              </h2>
            </div>
          )}
          {isLoadingP && (
            <div className="flex h-[150px] items-center justify-center xl:p-5">
              <CircularProgress color="info" size="sm" variant="plain" />
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => {
            activePage >= 2 && setActivePage(activePage - 1);
          }}
          disabled={activePage === 1}
          className="flex items-center justify-center rounded-lg  border border-stroke bg-gray p-2 hover:bg-opacity-50 disabled:bg-primary dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Prev Page
        </button>
        <button
          disabled={orders.length < limit}
          onClick={() => {
            setActivePage(activePage + 1);
          }}
          className="flex items-center justify-center  rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
        >
          Next Page
        </button>
      </div>
      <div>
        {/* Order Detail Modal */}
        {/* Order Detail Modal End */}
      </div>
      <Modal
        open={filterOpen}
        onClose={handleCloseFilter}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Filter
          </Typography>
          <Typography
            id="modal-modal-description"
            className="d-flex flex-column justify-content-around w-100"
            sx={{ mt: 2 }}
          >
            <h5>Status Filter</h5>
            <select
              id="select-size"
              className="select"
              onChange={filterStatusHandle}
            >
              {statues.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <input type="date" onChange={filterDateHandle}></input>
            <button onClick={() => getOrders()}>Search</button>
          </Typography>
        </Box>
      </Modal>
    </DefaultLayout>
  );
};

export default OrderList;
