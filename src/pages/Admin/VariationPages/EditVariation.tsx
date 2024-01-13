import { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import { Formik } from 'formik';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPromotionsById,
  updatePromotionById,
} from '../../../store/promotionSlices';
import { useParams } from 'react-router-dom';

const EditVariation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // @ts-expect-error
  const { promotion } = useSelector((state) => state.promotion);

  useEffect(() => {
    // @ts-expect-error
    dispatch(getPromotionsById(id));
  }, []);
  const [maxValue, setMaxValue] = useState(1);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [inputList, setinputList] = useState<any>([]);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter === 0) {
      if (promotion[0] && promotion[0].variation) {
        console.log('counter is equal to 0 and promotion has already been');
        const newArray = promotion[0].variation.products.map(
          ({ _id, ...rest }: any) => rest
        );
        setinputList(newArray);
        setCounter(counter + 1);
      }
    }
  }, [promotion]);
  const handleinputchange = (e: any, index: any) => {
    const { name, value } = e.target;
    if (name === 'isSelected') {
      let counter = 0;
      const newList: any = inputList.map((item: any, i: number) => {
        if (i === index) {
          // Seçili ürünü güncelle
          const updatedItem: any = { ...item, [name]: value };
          if (value === 'true') {
            counter++;
          }
          return updatedItem;
        }
        // Diğer ürünleri aynen tut
        if (item.isSelected === 'true') {
          counter++;
        }
        return item;
      });

      if (counter > maxValue) {
        setErrorMessage(
          'Productlardaki seçili ürün sayısı, maksimum değeri aşamaz'
        );
      } else {
        setinputList(newList);
      }
    } else {
      const newList: any = inputList.map((item: any, i: number) => {
        if (i === index) {
          // Değiştirilmek istenen özelliği güncelle
          return { ...item, [name]: value };
        }
        // Diğer ürünleri aynen tut
        return item;
      });

      setinputList(newList);
    }
  };

  const handleremove = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { name: '', price: 0, isSelected: false }]);
  };

  const validate = Yup.object({
    Name: Yup.string().required('Name is required'),
    Zorunlu: Yup.boolean().required('Zorunlu is required'),
    // @ts-expect-error
    MaxValue: Yup.number('Max Value harf içermemelidir')
      .min(1, 'Max Value 1 ya da daha yüksek olmalıdır')
      .positive()
      .integer()
      .required('Max Value is required'),
  });

  const ButtonHandleSubmit = (e: any) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (promotion && promotion.variation && promotion.variation.name) {
      setinputList(promotion.variation.products);
      console.log(promotion.variation, 'inputlist');
    }
  }, [promotion]);
  // useEffect(() => {
  //   console.log(inputList);
  // }, [inputList]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Edit Variation" />
        {!promotion && !promotion.variation && <h3>No Promotion</h3>}
        {promotion && promotion.variation && (
          <Formik
            initialValues={{
              Name: promotion.variation.name,
              Zorunlu: promotion.variation.iscompulsory,
              MaxValue: promotion.variation.maxValue,
              products: inputList,
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              const { Name, Zorunlu, MaxValue } = values;
              const variation = {
                name: Name,
                iscompulsory: Zorunlu,
                maxValue: MaxValue,
                products: inputList,
              };
              // @ts-expect-error
              dispatch(updatePromotionById({ variation, id }));
              // resetForm({ values: '' });
              setinputList([]);
            }}
          >
            {(formik) => (
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Edit Promotion Form
                  </h3>
                </div>

                {formik.errors.MaxValue && <div>{formik.errors.MaxValue}</div>}
                {formik.errors.Name && <div>{formik.errors.Name}</div>}
                {formik.errors.Zorunlu && <div>{formik.errors.Zorunlu}</div>}
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
                              <div className="w-full xl:w-1/2">
                                <label className="mb-2.5 block text-black dark:text-white">
                                  Promotion Name
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
                              <div className="form-group mb-3">
                                <label htmlFor="Name">Max Value</label>
                                <input
                                  id="MaxValue"
                                  name="MaxValue"
                                  type="number"
                                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                  required
                                  value={formik.values.MaxValue}
                                  onChange={(e: any) => {
                                    formik.handleChange(e);
                                    setMaxValue(e.target.value);
                                  }}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              {formik.errors.Name && formik.touched.Name ? (
                                <div className="error">
                                  * {formik.errors.Name as string}
                                </div>
                              ) : null}
                              <div className="form-group mb-3">
                                <label htmlFor="Name">Zorunlu</label>
                                <input
                                  id="Zorunlu"
                                  name="Zorunlu"
                                  className="ml-3"
                                  type="checkbox"
                                  value={formik.values.Zorunlu}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              {formik.errors.Name && formik.touched.Name ? (
                                <div className="error">
                                  * {formik.errors.Name}
                                </div>
                              ) : null}
                            </div>
                            <div className="row mb-3">
                              {inputList.map((x: any, i: number) => {
                                return (
                                  <div className="row mb-3">
                                    <div className="w-full xl:w-1/2">
                                      <label className="mb-2.5 block text-black dark:text-white">
                                        Promotion Product {i + 1}
                                      </label>
                                      <input
                                        type="text"
                                        name="name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="Enter First Name"
                                        onChange={(e: any) =>
                                          handleinputchange(e, i)
                                        }
                                        value={inputList[i].name}
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Price</label>
                                      <input
                                        type="number"
                                        name="price"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        placeholder="Enter Last Name"
                                        onChange={(e) =>
                                          handleinputchange(e, i)
                                        }
                                        value={inputList[i].price}
                                      />
                                    </div>
                                    <div className="form-group col-md-4">
                                      <label>Selected</label>
                                      <select
                                        name="isSelected"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        onChange={(e) =>
                                          handleinputchange(e, i)
                                        }
                                        value={inputList[i]['isSelected']}
                                      >
                                        <option value={false}>
                                          Seçili Değil
                                        </option>
                                        <option value={true}>Seçili</option>
                                      </select>
                                    </div>
                                    <div className="form-group col-md-2 mt-4">
                                      <button
                                        className="flex w-32 justify-center rounded bg-danger py-1 px-3 font-medium text-gray"
                                        onClick={() => handleremove(i)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                              <button
                                type="button"
                                className="flex w-32 justify-center rounded bg-meta-3 px-3 py-1 font-medium text-gray"
                                onClick={handleaddclick}
                              >
                                Add More
                              </button>
                            </div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded  bg-primary p-3 font-medium text-gray"
                              onSubmit={ButtonHandleSubmit}
                            >
                              Edit Promotion Now
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
      </DefaultLayout>
    </>
  );
};

export default EditVariation;
