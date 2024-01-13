import { useEffect, useState } from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumb';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOptionBySeller,
  insertOption,
  putOption,
} from '../../../../store/promotionSlices';
import { useNavigate, useParams } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
import { MediumCircularProgressBar } from '../../../../components/progressBar/circularProgressBar';
const EditOption = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { option, isLoading } = useSelector((state: any) => state.promotion);

  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Price: Yup.number()
      .min(0, 'Price must be minumum zero')
      .positive(0, 'Price must be positive')
      .required('Price is required'),
  });
  useEffect(() => {
    // @ts-expect-error
    dispatch(getOptionBySeller({ id }));
  }, []);
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Option" />
        {isLoading ? (
          <MediumCircularProgressBar />
        ) : (
          <>
            {!isLoading && !option?.name && (
              <div className="flex items-center justify-center rounded-sm border border-stroke bg-white p-12 shadow-default dark:border-strokedark dark:bg-boxdark">
                <h5>There is No Option</h5>
              </div>
            )}
            {option && option.name && (
              <Formik
                initialValues={{
                  Name: option.name,
                  Price: option.price,
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  const { Name, Price } = values;
                  const option = {
                    name: Name,
                    price: Price,
                  };
                  // @ts-expect-error
                  dispatch(putOption({ option, id }));
                  // resetForm({ values: '' });
                }}
              >
                {(formik) => (
                  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Option Form
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
                                  <div className="flex-1">
                                    <label className="mb-2.5 block  text-black dark:text-white">
                                      Opsiyon Name
                                    </label>
                                    <input
                                      id="Name"
                                      name="Name"
                                      type="text"
                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      required
                                      value={formik.values.Name}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                  {formik.errors.Name && formik.touched.Name ? (
                                    <div className="error">
                                      * {formik.errors.Name}
                                    </div>
                                  ) : null}
                                  <div className="form-group">
                                    <label htmlFor="Name">Price Value</label>
                                    <input
                                      id="Price"
                                      name="Price"
                                      type="number"
                                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:border-meta-1 disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                      required
                                      value={formik.values.Price}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </div>
                                  {formik.errors.Price &&
                                  formik.touched.Price ? (
                                    <div className="error">
                                      * {formik.errors.Price}
                                    </div>
                                  ) : null}
                                </div>
                                <button
                                  type="submit"
                                  className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray"
                                >
                                  {isLoading ? (
                                    <BeatLoader color="white"></BeatLoader>
                                  ) : (
                                    <span>Edit Promotion Now</span>
                                  )}
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
            )}
          </>
        )}
      </DefaultLayout>
    </>
  );
};

export default EditOption;
