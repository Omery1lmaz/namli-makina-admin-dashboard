import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../../components/Breadcrumb';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import DefaultLayout from '../../../layout/DefaultLayout';
import { useEffect, useState } from 'react';
import {
  getsellerInfo,
  updatePassword,
  updateSellerImage,
  updateSellerProfile,
} from '../../../store/authenticationSlices';
import * as Yup from 'yup';
import { MapIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Formik } from 'formik';

const Settings = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { sellerInfo, isLoading } = useSelector((state) => state.auth);
  const [image, setImage] = useState<File>();

  const formData = new FormData();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(image, 'image');
    image && formData.append('Image', image);
  }, [image]);

  const getData = () => {
    // @ts-expect-error
    dispatch(getsellerInfo());
  };
  const handleUpdateImage = () => {
    // @ts-expect-error
    dispatch(updateSellerImage({ formData }));
  };

  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Address: Yup.string().required('Adress is required'),
    IsTakeAway: Yup.boolean(),
    // number: Yup.number().required('Number is required'),
  });

  const passwordValidate = Yup.object({
    OldPassword: Yup.string()
      .min(6, 'Eski Şifre min 6 karakter olmalıdır')
      .max(15, 'Eski Şifre maksimum 15 karakter olmalıdır')
      .required('Eski Şifre is required'),
    Password: Yup.string()
      .min(6, 'Şifre min 6 karakter olmalıdır')
      .max(15, 'Şifre maksimum 15 karakter olmalıdır')
      .required('Şifre is required'),
    NewPassword: Yup.string()
      .min(6, 'Şifre Doğrulama min 6 karakter olmalıdır')
      .max(15, 'Şifre Doğrulama maksimum 15 karakter olmalıdır')
      .required('Şifre Doğrulama is required')
      .oneOf([Yup.ref('Password')], 'Yeni Şifre, Eski Şifre ile eşleşmiyor.'),
  });

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Company Information
                </h3>
              </div>
              <div className="min-h-[250px] p-7">
                {sellerInfo && sellerInfo.name && !isLoading && (
                  <Formik
                    initialValues={{
                      Name: sellerInfo.name,
                      Address: sellerInfo.address,
                      IsTakeAway: sellerInfo.isTakeAway,
                      number: sellerInfo.number,
                    }}
                    validationSchema={validate}
                    onSubmit={(values) => {
                      const { Name, Address, IsTakeAway, number } = values;
                      console.log(number);
                      dispatch(
                        // @ts-expect-error
                        updateSellerProfile({
                          name: Name,
                          address: Address,
                          isTakeAway: IsTakeAway,
                          number: number,
                        })
                      );
                    }}
                  >
                    {(formik) => {
                      return (
                        <form onSubmit={formik.handleSubmit}>
                          <div className="w-full ">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Full Name
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <UserIcon width={20} />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="Name"
                                name="Name"
                                type="text"
                                required
                                value={formik.values.Name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                          <div className="w-full ">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Phone Number
                            </label>
                            <div className="relative">
                              <PhoneInput
                                // @ts-expect-error
                                name="number"
                                id="number"
                                className="custom-phone-number-input w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                // value={value}
                                value={formik.values.number}
                                onChange={(e: any) => {
                                  formik.setFieldValue('number', e);
                                  console.log(formik.values.number);
                                }}
                                onBlur={() => {
                                  formik.setFieldTouched('number', true);
                                }}
                              />
                            </div>
                          </div>
                          <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="emailAddress"
                            >
                              Address
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <MapIcon width={20} />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="Address"
                                name="Address"
                                type="text"
                                required
                                value={formik.values.Address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                          <div className="mb-5.5 flex gap-1">
                            <div className="relative">
                              <input
                                className=" rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="checkbox"
                                id="IsTakeAway"
                                name="IsTakeAway"
                                defaultChecked={formik.values.IsTakeAway}
                                value={formik.values.IsTakeAway}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            <label
                              className="mb-3 text-sm font-medium text-black dark:text-white"
                              htmlFor="emailAddress"
                            >
                              Take a way
                            </label>
                          </div>

                          <div className="flex justify-end gap-4.5">
                            <button
                              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="min-h-[250px] p-7">
                {sellerInfo && !isLoading && (
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-14 w-14 rounded-full">
                        <img
                          src={sellerInfo.imageUrl}
                          className="h-full w-full rounded-full"
                          alt="User"
                        />
                      </div>
                      <div>
                        <span className="mb-1.5 text-black dark:text-white">
                          Edit your photo
                        </span>
                      </div>
                    </div>

                    <div
                      id="FileUpload"
                      className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                    >
                      <input
                        required
                        id="Image"
                        name="Image"
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                        onChange={(e) => {
                          // @ts-expect-error
                          setImage(e.target.files[0] as File);
                        }}
                      />
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                              fill="#3C50E0"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                              fill="#3C50E0"
                            />
                          </svg>
                        </span>
                        <p>
                          <span className="text-primary">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                        <p>(max, 800 X 800px)</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-70"
                        onClick={handleUpdateImage}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Reset Password
                </h3>
              </div>
              <div className="min-h-[250px] p-7">
                {sellerInfo && sellerInfo.name && !isLoading && (
                  <Formik
                    initialValues={{
                      OldPassword: '',
                      Password: '',
                      NewPassword: '',
                    }}
                    validationSchema={passwordValidate}
                    onSubmit={(values) => {
                      console.log(values, 'values');
                      const { OldPassword, Password, NewPassword } = values;
                      dispatch(
                        // @ts-expect-error
                        updatePassword({
                          oldPassword: OldPassword,
                          newPassword: Password,
                          newPasswordConfirm: NewPassword,
                        })
                      );
                    }}
                  >
                    {(formik) => {
                      return (
                        <form onSubmit={formik.handleSubmit}>
                          {formik.errors && (
                            <span>
                              {
                                (formik.errors.NewPassword,
                                formik.errors.OldPassword,
                                formik.errors.Password)
                              }
                            </span>
                          )}
                          <div className="w-full ">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Eski Şifre
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <UserIcon width={20} />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="OldPassword"
                                name="OldPassword"
                                type="password"
                                required
                                value={formik.values.OldPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>

                          <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="emailAddress"
                            >
                              Yeni Şifre
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <MapIcon width={20} />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="Password"
                                name="Password"
                                type="password"
                                required
                                value={formik.values.Password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                          <div className="mb-5.5">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="emailAddress"
                            >
                              Yeni Şifre Doğrulama
                            </label>
                            <div className="relative">
                              <span className="absolute left-4.5 top-4">
                                <MapIcon width={20} />
                              </span>
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                id="NewPassword"
                                name="NewPassword"
                                type="password"
                                required
                                value={formik.values.NewPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-4.5">
                            <button
                              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
