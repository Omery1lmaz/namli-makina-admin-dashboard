import { useEffect, useState } from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumb';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { insertOption } from '../../../../store/promotionSlices';
import { useNavigate } from 'react-router-dom';
import BeatLoader from 'react-spinners/BeatLoader';
const NewAddOption = () => {
  const dispatch = useDispatch();
  const [inputList, setinputList] = useState([]);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.promotion);

  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Price: Yup.number()
      .min(0, 'Price must be minumum zero')
      .positive(0, 'Price must be positive')
      .required('Price is required'),
  });
  const ButtonHandleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Variation" />
        <Formik
          initialValues={{
            Name: '',
            Price: 0,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            const { Name, Price } = values;
            const option = {
              name: Name,
              price: Price,
            };
            // @ts-expect-error
            dispatch(insertOption({ option }));
            // resetForm({ values: '' });
            setinputList([]);
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
                            {formik.errors.Price && formik.touched.Price ? (
                              <div className="error">
                                * {formik.errors.Price}
                              </div>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray"
                            onSubmit={ButtonHandleSubmit}
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
      </DefaultLayout>
    </>
  );
};

export default NewAddOption;
