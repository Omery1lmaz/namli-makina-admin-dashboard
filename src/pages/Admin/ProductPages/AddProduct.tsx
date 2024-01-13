import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import Multiselect from 'multiselect-react-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCatsBySeller } from '../../../store/productSlices';
import { getPromotionsBySeller } from '../../../store/promotionSlices';
const AddProduct = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { sellerCategories, isLoadingP } = useSelector(
    // @ts-ignore-
    (state) => state.product
  );
  const { promotions } = useSelector(
    // @ts-ignore-
    (state) => state.promotion
  );
  const [inputList, setinputList] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    // @ts-expect-error
    dispatch(getCatsBySeller());
    // @ts-expect-error
    dispatch(getPromotionsBySeller());
  }, []);
  const handleaddclick = (e: any) => {
    // @ts-expect-error
    setinputList([...inputList, [{ name: '', value: '' }]]);
    e.preventDefault();
  };
  const [inputListVariation, setinputListVariation] = useState([]);

  const handleinputchangeVariation = (
    e: any,
    index: number,
    indexInside: number
  ) => {
    const { name, value } = e.target;
    console.log('name', name);
    const list = [...inputListVariation];
    if (name == 'price') {
      // @ts-expect-error
      list[index].products[indexInside][name] = parseInt(value);
    } else if (name == 'isSelected') {
      // @ts-expect-error
      list[index].products[indexInside][name] = e.target.checked;
    } else {
      // @ts-expect-error
      list[index].products[indexInside]['name'] = value;
    }
    // name == 'price'
    //   ? // @ts-expect-error
    //     (list[index].products[indexInside][name] = parseInt(value))
    //   : // @ts-expect-error
    //     (list[index].products[indexInside][name] = value);
    // // @ts-expect-error
    // list.variations[index][name] = value;
  };
  useEffect(() => {
    console.log(inputListVariation, 'input listVariation');
  }, [inputListVariation]);

  const handleVariationNameChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const list = [...inputListVariation];
    name == 'isRequired'
      ? // @ts-expect-error
        (list[index][name] = e.target.checked)
      : // @ts-expect-error
        (list[index]['name'] = value);
    // list[index][name] = value;
    setinputListVariation(list);
  };
  const handleremoveVariation = (index: any) => {
    const list = [...inputListVariation];
    list.splice(index, 1);
    setinputListVariation(list);
  };
  const handleinputchange = ({ name, value }: any, index: any) => {
    const list = [...inputList];
    // @ts-expect-error
    list[index] = value;
    setinputList(list);
  };

  const handleRemoveInside = (e: any, index: any, indexInside: any) => {
    const list = [...inputListVariation];
    const t = list[index];
    // @ts-expect-error
    t.products.splice(indexInside, 1);
    list[index] = t;
    setinputListVariation(list);
    e.preventDefault();
  };

  const handleaddclickVariationList = (e: any) => {
    setinputListVariation([
      // @ts-expect-error
      ...inputListVariation,
      // @ts-expect-error
      {
        name: '',
        isRequired: false,
        products: [{ name: '', price: 0, isSelected: false }],
      },
    ]);
    e.preventDefault();
  };
  const handleaddclickVariation = (e: any, i: number) => {
    const list = [...inputListVariation];
    // @ts-expect-error
    const t = [...list[i].products, { name: '', price: 0, isSelected: false }];
    // @ts-expect-error
    list[i] = {
      name: list[i].name,
      products: t,
      isRequired: list[i].isRequired,
    };
    setinputListVariation(list);
    e.preventDefault();
  };

  const [image, setImage] = useState();
  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Description: Yup.string().required('Description is required'),
    Price: Yup.number('Ürün fiyatı harf içermemelidir')
      .min(1, 'Fiyat 1 ya da daha yüksek olmalıdır')
      .positive()
      .integer()
      .required('Price is required'),
    Category: Yup.array().required('Category Required'),
    Image: Yup.string().required('Resim seçmek zorunludur'),
    // @ts-expect-error
    inputListVariation:
      inputListVariation.length > 0
        ? Yup.array().of(
            Yup.object()
              .required('requreired')
              .shape({
                name: Yup.string()
                  .min(3, 'min 3 harf olmalı')
                  .required('Product name is required'),
                isRequired: Yup.boolean().required(
                  'Is Required field is required'
                ),
                products: Yup.array().of(
                  Yup.object().shape({
                    name: Yup.string()
                      .min(3, 'min 3 harf olmalı')
                      .required('Product name is required'),
                    price: Yup.number()
                      .required('Product price is required')
                      .positive('Price must be a positive number')
                      .integer('Price must be an integer')
                      .min(0, 'Price must be greater than or equal to 0'),
                  })
                ),
              })
          )
        : null,
    Promotions: Yup.array().of(
      Yup.object()
        .required('requreired')
        .shape({
          name: Yup.string().min(3, 'min 3 harf olmalı'),
          id: Yup.string().min(3, 'min 3 harf olmalı'),
        })
    ),
  });
  const handleremove = (e: any, index: any) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };
  useEffect(() => {
    formData.append('Image', image);
  }, [image]);

  const formData = new FormData();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />
      <Formik
        initialValues={{
          Name: '',
          Description: '',
          Price: 1,
          Image: '',
          Category: '',
          Promotions: '',
          inputListVariation: [
            {
              name: '',
              isRequired: false,
              products: [{ name: '', price: 0, isSelected: false }],
            },
          ],
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          console.log('onsubmit');
          const { Name, Description, Price, Category, Promotions } = values;
          formData.append('Name', Name);
          formData.append('Description', Description);
          formData.append('Category', JSON.stringify(Category));
          formData.append('Image', image);

          const ids = inputList.map((group: any) =>
            group.map((item: any) => item._id)
          );
          const flattenedIds = [].concat(...ids);
          const newPromotionList = [...flattenedIds];
          promotions.map((v: any, i: number) => {
            if (v == null || v == undefined) {
              newPromotionList.splice(i, 1);
            }
          });
          console.log(newPromotionList);
          const filteredArray = flattenedIds.filter(
            (item: any) => item !== null && item !== undefined
          );

          formData.append('Promotions', JSON.stringify(filteredArray));
          // @ts-expect-error
          formData.append('Price', Price);
          formData.append('variations', JSON.stringify(inputListVariation));
          // @ts-expect-error
          for (var key of formData.entries()) {
            console.log(JSON.stringify(key[0]) + ', ' + JSON.stringify(key[1]));
          }
          for (var testPromotion in promotions) {
            console.log(testPromotion, 'test promotion');
          }
          const product = {
            Name,
            Description,
            Price,
            Category,
            Promotions,
            variations: inputListVariation,
            formData,
          };
          // @ts-expect-error
          dispatch(addProduct({ product, formData }));
          // @ts-expect-error
          resetForm({ values: '' });
          setinputListVariation([]);
        }}
      >
        {(formik) => (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Product Form
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              {<span>{JSON.stringify(formik.errors.inputListVariation)}</span>}
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 ">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {formik.errors.Name && formik.touched.Name ? (
                      <div className="error">* {formik.errors.Name}</div>
                    ) : null}
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Price
                    </label>
                    <input
                      type="number"
                      name="Price"
                      value={formik.values.Price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {formik.errors.Price && formik.touched.Price ? (
                      <div className="error">* {formik.errors.Price}</div>
                    ) : null}
                  </div>

                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Category
                    </label>
                    <Multiselect
                      id="Category"
                      name="Category"
                      options={
                        Array.isArray(sellerCategories) &&
                        sellerCategories.length >= 1
                          ? sellerCategories.map((cat) => {
                              return {
                                name: cat.name,
                                _id: cat._id,
                              };
                            })
                          : []
                      } // Options to display in the dropdown
                      selectedValues={
                        formik.values.Category ? formik.values.Category : []
                      }
                      placeholder="Select Category"
                      // Preselected value to persist in dropdown
                      onSelect={(selectedList, selectedItem) => {
                        formik.values.Category = selectedList;
                      }} // Function will trigger on select event
                      onRemove={(selectedList, selectedItem) => {
                        formik.values.Category = selectedList;
                      }} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />{' '}
                    {formik.errors.Category ? (
                      <div className="error">* {formik.errors.Category}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    id="Description"
                    name="Description"
                    value={formik.values.Description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={6}
                    placeholder="Type the product's description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  {formik.errors.Description && formik.touched.Description ? (
                    <div className="error">* {formik.errors.Description}</div>
                  ) : null}
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Upload Image
                  </label>
                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      id="Image"
                      name="Image"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                      onChange={(e) => {
                        // @ts-expect-error
                        setImage(e.target.files[0] as File);
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
                      <div className="row mb-3" key={i}>
                        <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Add Promotion {i + 1}
                          </label>
                          <Multiselect
                            key={i}
                            // id="Promotions"
                            // name="Promotions"
                            className="dark:bg-form-input"
                            options={
                              Array.isArray(promotions) &&
                              promotions.length >= 1
                                ? promotions.map((promotion) => {
                                    return {
                                      name: promotion.variation.name,
                                      _id: promotion._id,
                                    };
                                  })
                                : []
                            } // Options to display in the dropdown
                            selectedValues={
                              formik.values.Promotions
                                ? formik.values.Promotions
                                : []
                            }
                            placeholder="Select Promotion"
                            // Preselected value to persist in dropdown
                            onSelect={(selectedList, selectedItem) => {
                              formik.setFieldValue('');
                              handleinputchange(
                                {
                                  name: selectedItem.name,
                                  value: selectedList,
                                },
                                i
                              );
                              // formik.values.Promotions = selectedList;
                            }}
                            // Function will trigger on select event
                            onRemove={(selectedList, selectedItem) => {
                              formik.values.Promotions = selectedList;
                            }} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                          <button
                            className="mt-2 flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-meta-1 p-2 text-white hover:bg-opacity-50 dark:border-strokedark dark:hover:bg-opacity-50"
                            onClick={(e: any) => {
                              handleremove(e, i);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    onClick={handleaddclick}
                  >
                    Add More Promotion
                  </button>
                </div>
                {formik.errors.Promotions ? (
                  <div className="error">* {formik.errors.Promotions}</div>
                ) : null}

                <div className="col-sm-12">
                  {inputListVariation.map((x, i) => {
                    return (
                      <div className="row mb-3">
                        <div className="w-full ">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Variation name
                          </label>
                          <input
                            type="text"
                            name={`inputListVariation[${i}].name`}
                            placeholder="Enter Variation Name"
                            onBlur={formik.handleBlur}
                            value={inputListVariation[i].name}
                            onChange={(e) => {
                              handleVariationNameChange(e, i);
                              formik.handleChange(e);
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                          />
                        </div>
                        {formik.touched.inputListVariation &&
                          formik.touched.inputListVariation[i] &&
                          formik.errors.inputListVariation &&
                          formik.errors.inputListVariation[i] &&
                          formik.errors.inputListVariation[i].name && (
                            <div className="error">
                              * {formik.errors.inputListVariation[i].name}
                            </div>
                          )}
                        <div className="my-2 w-full ">
                          <label className="mb-2.5  text-black dark:text-white">
                            Is Required :
                          </label>
                          <input
                            type="checkbox"
                            name="isRequired"
                            className="ml-3"
                            placeholder="Enter  Name"
                            onChange={(e) => handleVariationNameChange(e, i)}
                          />
                        </div>
                        {
                          // @ts-expect-error
                          x.products.map((y: any, u: number) => {
                            return (
                              <>
                                <div className="w-full">
                                  <label className="mb-2.5 block text-black dark:text-white">
                                    Product Name
                                  </label>
                                  <input
                                    type="text"
                                    name={`inputListVariation[${i}].products[${u}].name`}
                                    placeholder="Enter Name"
                                    onBlur={formik.handleBlur}
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                      handleinputchangeVariation(e, i, u);
                                    }}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  />
                                </div>
                                {formik.touched.inputListVariation &&
                                  formik.touched.inputListVariation[i] &&
                                  formik.touched.inputListVariation[i]
                                    .products &&
                                  formik.touched.inputListVariation[i].products[
                                    u
                                  ] &&
                                  formik.errors.inputListVariation &&
                                  formik.errors.inputListVariation[i] &&
                                  formik.errors.inputListVariation[i]
                                    .products &&
                                  formik.errors.inputListVariation[i].products[
                                    u
                                  ] &&
                                  formik.errors.inputListVariation[i].products[
                                    u
                                  ].name && (
                                    <div className="error">
                                      {
                                        formik.errors.inputListVariation[i]
                                          .products[u].name
                                      }
                                    </div>
                                  )}

                                <div className="w-full ">
                                  <label className="mb-2.5 block text-black dark:text-white">
                                    Product Price
                                  </label>
                                  <input
                                    type="number"
                                    name={`inputListVariation[${i}].products[${u}].price`}
                                    placeholder="Enter Price"
                                    onBlur={formik.handleBlur}
                                    value={
                                      inputListVariation[i].products[u].price
                                    }
                                    onChange={(e) => {
                                      e.target.name = 'price';
                                      handleinputchangeVariation(e, i, u);
                                      e.target.name = `inputListVariation[${i}].products[${u}].price`;
                                      e.target.value =
                                        inputListVariation[i].products[u].price;
                                      console.log(e.target.value);
                                      formik.handleChange(e);
                                    }}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  />
                                </div>
                                {formik.touched.inputListVariation &&
                                  formik.touched.inputListVariation[i] &&
                                  formik.touched.inputListVariation[i]
                                    .products &&
                                  formik.touched.inputListVariation[i].products[
                                    u
                                  ] &&
                                  formik.errors.inputListVariation &&
                                  formik.errors.inputListVariation[i] &&
                                  formik.errors.inputListVariation[i]
                                    .products &&
                                  formik.errors.inputListVariation[i].products[
                                    u
                                  ] &&
                                  formik.errors.inputListVariation[i].products[
                                    u
                                  ].price && (
                                    <div className="error">
                                      {
                                        formik.errors.inputListVariation[i]
                                          .products[u].price
                                      }
                                    </div>
                                  )}
                                <div className="row mb-3">
                                  <div className="my-2 w-full">
                                    <label className="mb-2.5  text-black dark:text-white">
                                      Is Selected :
                                    </label>
                                    <input
                                      type="checkbox"
                                      name="isSelected"
                                      className="ml-3"
                                      onChange={(e) =>
                                        handleinputchangeVariation(e, i, u)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-md-2 mt-4">
                                  <button
                                    className="mt-2 flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-meta-1 p-2 text-white hover:bg-opacity-50 dark:border-strokedark dark:hover:bg-opacity-50"
                                    onClick={(e) => handleRemoveInside(e, i, u)}
                                  >
                                    Remove Product
                                  </button>
                                </div>
                              </>
                            );
                          })
                        }
                        <div className="form-group col-md-2 mt-4">
                          <button
                            className="mt-2 flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-meta-3 p-2 text-white hover:bg-opacity-50 dark:border-strokedark dark:hover:bg-opacity-50"
                            onClick={(e) => handleaddclickVariation(e, i)}
                          >
                            Add Variation
                          </button>
                        </div>
                        <div className="form-group col-md-2 mt-4">
                          <button
                            className="mt-2 flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-meta-1 p-2 text-white hover:bg-opacity-50 dark:border-strokedark dark:hover:bg-opacity-50"
                            onClick={() => handleremoveVariation(i)}
                          >
                            Remove Variation
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    className="flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    onClick={handleaddclickVariationList}
                  >
                    Add More
                  </button>
                </div>
                <button
                  type="submit"
                  className="my-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default AddProduct;
