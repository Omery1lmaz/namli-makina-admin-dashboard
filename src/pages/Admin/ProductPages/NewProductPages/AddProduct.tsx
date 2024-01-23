import { useEffect, useState } from 'react';
import DefaultLayout from '../../../../layout/DefaultLayout';
import Breadcrumb from '../../../../components/Breadcrumb';
import Multiselect from 'multiselect-react-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProduct,
  getCatsBySeller,
  getProductsBySellerLimit,
  getUsers,
  newAddProduct,
} from '../../../../store/productSlices';
import { getOptionsBySeller } from '../../../../store/promotionSlices';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { createOffier } from '../../../../store/authenticationSlices';

type OptionCategory = {
  name: string;
  minCount: number;
  maxCount: number;
  options: [any];
};

const NewAddProduct = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { sellerCategories, sellerProducts } = useSelector((state: any) => {
    return state.product;
  });
  const { isLoading } = useSelector((state: any) => {
    return state.auth;
  });

  const formData = new FormData();

  const { options, promotions } = useSelector((state: any) => state.promotion);
  const [inputList, setinputList] = useState<OptionCategory[]>([]);
  useEffect(() => {
    // @ts-expect-error
    dispatch(getCatsBySeller());
    // @ts-expect-error
    dispatch(getOptionsBySeller());
    // @ts-expect-error
    dispatch(getProductsBySellerLimit({ skip: 0, limit: 99999 }));
  }, []);
  const handleaddclick = (e: any) => {
    setinputList([
      ...inputList,
      {
        name: '',
        minCount: 1,
        maxCount: 1,
        options: [
          {
            name: '',
            price: 1,
            priceNoDiscount: 1,
          },
        ],
      },
    ]);
    e.preventDefault();
  };
  const handleAddClickInputListProduct = (i: number) => {
    const deepCopyArray = [...inputList];
    deepCopyArray[i].options.push({
      name: '',
      price: 1,
      priceNoDiscount: 1,
    });
    setinputList([...deepCopyArray]);
  };
  const handleremove = (i: any, z: number) => {
    console.log(i, z);
    const list = [...inputList];
    list[i].options.splice(z, 1);
    setinputList([...list]);
    console.log('first');
  };
  const handleremoveOptionCategory = (i: any) => {
    const list = [...inputList];
    list.splice(i, 1);
    setinputList([...list]);
  };
  const handleOptionChange = ({ value, indexGroup, indexOption }: any) => {
    const list = [...inputList];
    list[indexGroup].options[indexOption] = value;
    setinputList([...list]);
    console.log(inputList);
  };

  const handleInputListChangeInputs = (e: any, i: number) => {
    const list: any = [...inputList];
    list[i][e.target.name] = e.target.value;
    setinputList([...list]);
  };

  const [image, setImage] = useState();
  const validate = Yup.object({
    // Name: Yup.string().required('Name is required'),
    // Description: Yup.string().required('Description is required'),
    // Price: Yup.number('Ürün fiyatı harf içermemelidir')
    //   .min(1, 'Fiyat 1 ya da daha yüksek olmalıdır')
    //   .positive()
    //   .integer()
    //   .required('Price is required'),
    // Category: Yup.array().required('Category Required'),
    // Image: Yup.string().required('Resim seçmek zorunludur'),
    // Promotions: Yup.array().of(
    //   Yup.object()
    //     .required('requreired')
    //     .shape({
    //       name: Yup.string().min(3, 'min 3 harf olmalı'),
    //       id: Yup.string().min(3, 'min 3 harf olmalı'),
    //     })
    // ),
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const appendDataToFormData = (data) => {
    const formData = new FormData();
    formData.append('test', data);
    console.log('affasdnanskjd');
    for (var key of formData.entries()) {
      console.log(JSON.stringify(key[0]) + ', ' + JSON.stringify(key[1]));
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    console.log('selected file', event.target.files[0]);
    appendDataToFormData(selectedFile);
  };

  const [officer, setOfficer] = useState({
    name: '',
    gender: false,
  });

  useEffect(() => {
    console.log(isLoading, 'is loading');
  }, [isLoading]);

  useEffect(() => {
    if (selectedFile) {
      appendDataToFormData(selectedFile);
    }
  }, [selectedFile]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="New Add Officer" />
      <Formik
        initialValues={{
          Name: '',
          gender: false,
        }}
        onSubmit={(values, { resetForm }) => {
          const { Name, gender } = values;
          console.log(gender, 'gender');
          const genderString = gender ? true : false;

          formData.append('image', image as any);
          formData.append(
            'officer',
            JSON.stringify({
              name: Name,
              gender: genderString,
            })
          );
          // @ts-expect-error
          dispatch(createOffier({ formData }));
        }}
      >
        {(formik) => (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Officer Form
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 ">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Officer Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {formik.errors.Name && formik.touched.Name ? (
                      <div className="error">* {formik.errors.Name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-start gap-1">
                    <label className="block text-black dark:text-white">
                      Select Limit:
                    </label>

                    <div className="relative z-20 bg-white dark:bg-form-input">
                      <select
                        id="gender"
                        name="gender"
                        // @ts-ignore
                        value={formik.values.gender}
                        onChange={(e: any) => {
                          formik.setFieldValue('gender', e.target.value);
                          const genderString = formik.values.gender
                            ? 'male'
                            : 'female';

                          console.log(`gender: ${genderString}`);
                        }}
                        onBlur={formik.handleBlur}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent p-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                      >
                        <option key={'female'} value={false}>
                          Kadın
                        </option>
                        <option key={'male'} value={true}>
                          Erkek
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image
                  </label>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      id="Image"
                      name="Image"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      // onChange={handleFileChange}
                      onChange={(e) => {
                        // @ts-expect-error
                        setImage(e.target.files[0] as File);
                        console.log(image, 'image ');
                        formik.handleChange(e);
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
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>
                  {formik.errors.Image ? (
                    <div className="error">* {formik.errors.Image}</div>
                  ) : null}
                </div>
                <div className="col-sm-12">
                  {inputList.map((x: any, i: any) => {
                    return (
                      <div className="row mb-3 rounded-lg p-4 shadow-8" key={i}>
                        <div className="my-4  gap-3">
                          <div className="">
                            <label className="mb-2.5  flex items-center justify-between text-black dark:text-white">
                              <span> Add Promotion {i + 1}</span>
                              <TrashIcon
                                className="h-8 cursor-pointer"
                                onClick={(e: any) => {
                                  handleremoveOptionCategory(i);
                                  e.preventDefault();
                                }}
                              />
                            </label>
                            <input
                              type="text"
                              id="Name"
                              name="name"
                              onChange={(e: any) => {
                                handleInputListChangeInputs(e, i);
                              }}
                              placeholder="Enter your first name"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {formik.errors.Name && formik.touched.Name ? (
                              <div className="error">
                                * {formik.errors.Name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="my-4 flex  gap-3">
                          <div className="flex-1">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Minimum Select
                            </label>
                            <input
                              type="number"
                              id="minCount"
                              name="minCount"
                              placeholder="Enter your first name"
                              onChange={(e) => {
                                handleInputListChangeInputs(e, i);
                              }}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {formik.errors.Name && formik.touched.Name ? (
                              <div className="error">
                                * {formik.errors.Name}
                              </div>
                            ) : null}
                          </div>
                          <div className="flex-1">
                            <label className="mb-2.5 block text-black dark:text-white">
                              Maximum Select
                            </label>
                            <input
                              type="number"
                              id="maxCount"
                              name="maxCount"
                              onChange={(e: any) => {
                                handleInputListChangeInputs(e, i);
                              }}
                              placeholder="Enter your first name"
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                            {formik.errors.Name && formik.touched.Name ? (
                              <div className="error">
                                * {formik.errors.Name}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {x.options.map((option: any, z: number) => {
                          return (
                            <div className="mb-4.5  rounded-lg p-5  shadow-8">
                              <label className="mb-2.5  flex items-center justify-between text-black dark:text-white">
                                <span> Add Promotion {i + 1}</span>
                                <TrashIcon
                                  className="h-8 cursor-pointer"
                                  onClick={(e: any) => {
                                    handleremove(i, z);
                                    e.preventDefault();
                                  }}
                                />
                              </label>
                              <div className="flex flex-1 items-center justify-between gap-4">
                                <div className=" flex-1">
                                  <label className="mb-2.5 block text-black dark:text-white">
                                    Variation Name
                                  </label>
                                  <select
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    onChange={(e: any) => {
                                      // console.log(JSON.parse(e.target.value));
                                      handleOptionChange({
                                        value: JSON.parse(e.target.value),
                                        indexGroup: i,
                                        indexOption: z,
                                      });
                                    }}
                                  >
                                    {options.map((option: any) => {
                                      return (
                                        <option
                                          key={option._id}
                                          value={JSON.stringify(option)}
                                        >
                                          {option.name}
                                        </option>
                                      );
                                    })}
                                    {sellerProducts.map((option: any) => {
                                      return (
                                        <option
                                          key={option._id}
                                          value={JSON.stringify(option)}
                                        >
                                          {option.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                <div className=" flex-1">
                                  <label className="mb-2.5 block text-black dark:text-white">
                                    Variation Price
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div className="my-2 flex w-full items-center justify-end">
                          <PlusIcon
                            className="h-8 cursor-pointer rounded-lg shadow-8"
                            onClick={(e: any) => {
                              handleAddClickInputListProduct(i);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  className="my-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  {isLoading ? (
                    <span>Yükleniyor...</span>
                  ) : (
                    <span>Add Product</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default NewAddProduct;
