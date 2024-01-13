import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import {
  deleteCategoryById,
  getCatsBySeller,
} from '../../../store/productSlices';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import { Box, Typography } from '@mui/material';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
  deletePromotionById,
  // getPromotionsBySeller,
} from '../../../store/promotionSlices';
import {
  deletePromosyonById,
  getPromosyonsBySeller,
} from '../../../store/promosyonSlice';

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

const PromosyonList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { promosyons, isLoadingPr } = useSelector(
    // @ts-expect-error
    (state) => state.promosyon
  );
  const { user } = useSelector(
    // @ts-expect-error
    (state) => state.auth
  );

  const [selectedPromotionId, setSelectedPromotionId] = useState();

  useEffect(() => {
    // @ts-expect-errorgetPromotionsBySeller
    dispatch(getPromosyonsBySeller());
  }, []);

  const deletePromotion = () => {
    // @ts-expect-error
    dispatch(deletePromosyonById(selectedPromotionId));
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Promotion List" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Promotion Name</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Seller</p>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <p className="font-medium">Actions</p>
          </div>
        </div>

        {!isLoadingPr &&
          promosyons?.map((promotion: any, key: number) => {
            return (
              <div
                key={key}
                className="grid grid-cols-3 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-3 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {promotion.name}
                  </p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="max-w-[350px] truncate text-sm text-black dark:text-white sm:max-w-[100px]">
                    {promotion.seller[0] == user._id ? 'ME' : 'all'}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {promotion.seller[0] == user._id ? (
                    <div className="flex items-center justify-center gap-2">
                      <TrashIcon
                        className="cursor-pointer hover:scale-110"
                        width={16}
                        onClick={() => {
                          setSelectedPromotionId(promotion._id);
                          handleOpen();
                        }}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <div className="bg-gray-800 absolute left-2/4 top-2/4 h-36 w-1/4 translate-x-[-50%] translate-y-[-50%] rounded bg-graydark p-4 text-white">
                      <h3 className="text-lg font-medium">
                        Are You Sure to Delete Promotion
                      </h3>
                      <hr className="my-3"></hr>
                      <div className="flex items-center justify-evenly gap-1">
                        <button
                          className="flex items-center justify-center rounded-lg border border-stroke bg-gray p-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                          onClick={() => {
                            deletePromotion();
                            handleClose();
                          }}
                        >
                          Yes
                        </button>

                        <button
                          className="flex items-center justify-center rounded-lg border border-stroke bg-gray p-2 px-5 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            );
          })}
        {promosyons?.length == 0 && !isLoadingPr && (
          <div className="flex h-[150px]  w-full items-center justify-center xl:p-5">
            <h2 className="text-center text-lg font-semibold text-black dark:text-white">
              No Promotion
            </h2>
          </div>
        )}
        {isLoadingPr && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PromosyonList;
