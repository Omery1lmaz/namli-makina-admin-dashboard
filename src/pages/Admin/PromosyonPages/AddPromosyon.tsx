import { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { Formik } from 'formik';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addPromotion } from '../../../store/promotionSlices';
import { addPromosyon } from '../../../store/promosyonSlice';

const AddPromosyon = () => {
  const dispatch = useDispatch();
  // const handleDateTimeChange = (momentObj: any) => {
  // const selectedDate = momentObj.format('YYYY-MM-DD');
  // console.log(selectedDate); // Seçilen tarih değerini işleme alma (format: YYYY-MM-DD)

  // console.log(momentObj); // Seçilen tarih ve saat değerini işleme alma
  // };

  const validate = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Minumum üç harf içermelidir'),
    seller: Yup.boolean().required('Zorunlu is required'),
    price: Yup.number('Price harf içermemelidir')
      .min(1, 'Price 1 ya da daha yüksek olmalıdır')
      .positive()
      .required('Price Value is required'),
    lowestPrice: Yup.number('lowestPrice harf içermemelidir')
      .min(1, 'lowestPrice 1 or higher')
      .positive()
      .required('lowestPrice Value is required')
      .test(
        'lowestPrice',
        'lowestPrice must be smaller than highestPrice',
        function (value) {
          const { highestPrice } = this.parent;
          return value < highestPrice;
        }
      ),
    highestPrice: Yup.number('highestPrice harf içermemelidir')
      .min(1, 'highestPrice 1 ya da daha yüksek olmalıdır')
      .positive()
      .required('highestPrice Value is required'),
    maximumUsageRights: Yup.number('maximumUsageRights harf içermemelidir')
      .min(1, 'maximumUsageRights 1 ya da daha yüksek olmalıdır')
      .positive()
      .integer('Must be integer')
      .required('maximumUsageRights Value is required'),
    expirationDate: Yup.date()
      .required('Tarih ve saat alanı zorunludur')
      .min(new Date(Date.now()), 'Geçmiş bir tarih ve saat seçilemez'),
  });

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Variation" />
        <Formik
          initialValues={{
            name: '',
            seller: false,
            price: 1,
            lowestPrice: 1,
            highestPrice: 10,
            maximumUsageRights: 1,
            expirationDate: '',
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            const {
              name,
              seller,
              price,
              lowestPrice,
              highestPrice,
              maximumUsageRights,
              expirationDate,
            } = values;
            const promotion = {
              name,
              seller,
              price,
              lowestPrice,
              highestPrice,
              maximumUsageRights,
              expirationDate,
            };
            // @ts-expect-error
            dispatch(addPromosyon({ promotion }));
            // resetForm({ values: '' });
          }}
        >
          {(formik) => (
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Promosyon Form
                </h3>
              </div>

              <div className="p-6.5">
                <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                  <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <div className="row tm-edit-product-row">
                      <div className="col-xl-6 col-lg-6 col-md-12">
                        <form
                          action=""
                          className="tm-edit-product-form"
                          onSubmit={formik.handleSubmit}
                        >
                          <div className="row mb-3">
                            <div className="w-full ">
                              <label className="mb-2.5 block text-black dark:text-white">
                                Promosyon Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.name && formik.touched.name ? (
                              <div className="error">
                                * {formik.errors.name}
                              </div>
                            ) : null}
                            <div className="form-group mb-3">
                              <label htmlFor="Name">Price</label>
                              <input
                                id="price"
                                name="price"
                                type="number"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.price && formik.touched.price ? (
                              <div className="error">
                                * {formik.errors.price}
                              </div>
                            ) : null}

                            <div className="form-group mb-3">
                              <label htmlFor="Name">Highest Price</label>
                              <input
                                id="highestPrice"
                                name="highestPrice"
                                type="number"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                required
                                value={formik.values.highestPrice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.highestPrice &&
                            formik.touched.highestPrice ? (
                              <div className="error">
                                * {formik.errors.highestPrice}
                              </div>
                            ) : null}
                            <div className="form-group mb-3">
                              <label htmlFor="Name">Lowest Price</label>
                              <input
                                id="lowestPrice"
                                name="lowestPrice"
                                type="number"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                value={formik.values.lowestPrice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.lowestPrice &&
                            formik.touched.lowestPrice ? (
                              <div className="error">
                                * {formik.errors.lowestPrice}
                              </div>
                            ) : null}
                            <div className="form-group mb-3">
                              <label htmlFor="maximumUsageRights">
                                Maximum Usage Rights
                              </label>
                              <input
                                id="maximumUsageRights"
                                name="maximumUsageRights"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                type="number"
                                value={formik.values.maximumUsageRights}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.maximumUsageRights &&
                            formik.touched.maximumUsageRights ? (
                              <div className="error">
                                * {formik.errors.maximumUsageRights}
                              </div>
                            ) : null}
                            <div className="form-group mb-3">
                              <label htmlFor="maximumUsageRights">
                                Maximum Usage Rights
                              </label>
                              <Datetime
                                className="w-full border-[1.5px] border-stroke bg-transparent hover:cursor-pointer focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary "
                                onChange={(e: any) => {
                                  formik.setFieldValue('expirationDate', e._d);
                                  console.log(formik.values.expirationDate);
                                  formik.setFieldTouched(
                                    formik.values.expirationDate
                                  );
                                  console.log(formik.errors.expirationDate);
                                }}
                              />
                            </div>
                            {formik.errors.expirationDate ? (
                              <div className="error">
                                * {formik.errors.expirationDate}
                              </div>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray"
                          >
                            Add Promosyon Now
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </DefaultLayout>
    </>
  );
};

export default AddPromosyon;
