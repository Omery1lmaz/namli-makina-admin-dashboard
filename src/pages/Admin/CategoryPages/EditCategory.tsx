import React, { useEffect } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import CircularProgress from '@mui/joy/CircularProgress';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addCategories,
  getCategoryById,
  updateCategory,
} from '../../../store/productSlices';

const EditCategory = () => {
  const { id } = useParams();

  const validate = Yup.object({
    name: Yup.string()
      .min(3, 'minimum 3 karakter olmalıdır')
      .required('name is required'),
  });
  const { isLoadingP, category } = useSelector(
    // @ts-expect-error
    (state) => state.product
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-expect-error
    dispatch(getCategoryById({ id }));
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Category" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Edit Category Form
          </h3>
        </div>
        {!isLoadingP && category.name && (
          <Formik
            initialValues={{
              name: category.name && category.name,
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              console.log(values);
              const { name } = values;
              const category = { name };
              // @ts-expect-error
              dispatch(updateCategory({ category, id }));
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
                    {formik.errors.name && formik.touched.name ? (
                      <div className="error">* {formik.errors.name}</div>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  >
                    Edit Category
                  </button>
                </div>
              </form>
            )}
          </Formik>
        )}
        {isLoadingP && (
          <div className="flex h-[150px] items-center justify-center xl:p-5">
            <CircularProgress color="info" size="sm" variant="plain" />
          </div>
        )}
        {!isLoadingP && !category.name && (
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

export default EditCategory;
