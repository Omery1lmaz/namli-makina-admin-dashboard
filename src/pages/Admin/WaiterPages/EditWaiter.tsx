import React, { useEffect } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCategories } from '../../../store/productSlices';
import { getWaiter, updateWaiter } from '../../../store/waiterSlice';
import CircularProgress from '@mui/joy/CircularProgress';

const EditWaiter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isSuccessW, isLoadingW, waiter } = useSelector(
    // @ts-expect-error
    (state) => state.waiter
  );
  useEffect(() => {
    // @ts-expect-error
    dispatch(getWaiter({ id }));
  }, []);

  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum 3 karakter olmalıdır')
      .required('Name is required'),
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Waiter" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Waiter Form
          </h3>
        </div>
        {!isLoadingW && waiter.name && (
          <Formik
            initialValues={{
              name: waiter.name,
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              console.log(values);
              const { name } = values;
              const waiter = { name, _id: id };
              // @ts-expect-error
              dispatch(updateWaiter({ waiter }));
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                  <div className="my-2 w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Waiter Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter waiter name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Edit Waiter
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
        {isLoadingW && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
        {!isLoadingW && !waiter.name && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <h2 className="text-lg font-medium text-black dark:text-white">
              Category Getirilemedi
            </h2>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditWaiter;
