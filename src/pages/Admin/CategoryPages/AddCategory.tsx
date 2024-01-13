import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCategories } from '../../../store/productSlices';

const AddCategory = () => {
  const validate = Yup.object({
    name: Yup.string().required('name is required'),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Category" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Category Form
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
            const category = { name };
            // @ts-expect-error
            dispatch(addCategories(category));
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="my-2 w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter category name"
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
                  Add Category
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </DefaultLayout>
  );
};

export default AddCategory;
