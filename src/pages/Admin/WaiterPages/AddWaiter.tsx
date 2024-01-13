import React, { useEffect } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategories } from '../../../store/productSlices';
import { addWaiter } from '../../../store/waiterSlice';

const AddWaiter = () => {
  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum 3 karakter olmalıdır')
      .required('name is required'),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // @ts-expect-error
  const { isLoadingW, isSuccessW } = useSelector((state) => state.waiter);
  const gotoWaiterListPage = () => navigate('/waiter-list');

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Waiter" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Waiter Form
          </h3>
        </div>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            console.log(values);
            const { name } = values;
            const waiter = { name };
            // @ts-expect-error
            dispatch(addWaiter({ waiter }));
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
                  Add Waiter
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default AddWaiter;
