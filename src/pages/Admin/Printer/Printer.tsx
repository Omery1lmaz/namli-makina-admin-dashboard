import { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumb';
import Multiselect from 'multiselect-react-dropdown';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getCatsBySeller } from '../../../store/productSlices';
import {
  getLocalPrinters,
  getPrinters,
  updatePrinters,
} from '../../../store/printerSlice';
const Printer = () => {
  const dispatch = useDispatch();
  // @ts-expect-error
  const { sellerCategories, isLoadingP } = useSelector(
    // @ts-ignore-
    (state) => state.product
  );
  const { localPrinters, printers } = useSelector(
    // @ts-ignore-
    (state) => state.printer
  );

  const [inputList, setinputList] = useState([]);
  useEffect(() => {
    // @ts-expect-error
    dispatch(getCatsBySeller());
    // @ts-expect-error
    dispatch(getLocalPrinters());
    // @ts-expect-error
    dispatch(getPrinters());
  }, []);

  useEffect(() => {
    if (printers && Array.isArray(printers.printers)) {
      setinputList(printers.printers);
      // setinputList(printers.printers as []);
      console.log('inputList', inputList, printers.printers);
    }
  }, [printers]);

  const handleaddclick = (e: any) => {
    // @ts-expect-error
    setinputList([...inputList, { name: '', DisabledCategories: [] }]);
    e.preventDefault();
  };

  const handleinputchange = ({ name, value }: any, index: any) => {
    const list = [...inputList];
    // @ts-expect-error

    const item = { ...list[index] }; // Öğeyi kopyala

    item[name] = value;
    // @ts-expect-error

    list[index] = item;

    setinputList(list);
  };
  const handleremove = (e: any, index: any) => {
    e.preventDefault();
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />
      <Formik
        initialValues={{
          Promotions: '',
        }}
        onSubmit={(values, { resetForm }) => {
          const {} = values;

          // @ts-expect-error
          dispatch(updatePrinters({ printers: inputList }));
          // @ts-expect-error
          resetForm({ values: '' });
        }}
      >
        {(formik) => (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Printers
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="col-sm-12">
                  {inputList.map((x: any, i: any) => {
                    return (
                      <div className="row mb-3" key={i}>
                        <div className="w-full">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Yazdırılmayacak kategoriye ait ürünleri seçin
                          </label>
                          <Multiselect
                            id="Category"
                            name="DisabledCategories"
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
                            }
                            selectedValues={x['DisabledCategories']}
                            placeholder="Select Category"
                            onSelect={(selectedList, selectedItem) => {
                              console.log(selectedList, 'selectedList');
                              handleinputchange(
                                {
                                  name: 'DisabledCategories',
                                  value: selectedList.map((item: any) => {
                                    return { _id: item._id, name: item.name };
                                  }),
                                },
                                i
                              );
                            }}
                            onRemove={(selectedList, selectedItem) => {
                              handleinputchange(
                                {
                                  name: 'DisabledCategories',
                                  value: selectedList.map((item: any) => {
                                    return { _id: item._id, name: item.name };
                                  }),
                                },
                                i
                              );
                            }}
                            displayValue="name"
                          />{' '}
                        </div>
                        <div className="mb-4.5">
                          <label className="mb-2.5 block text-black dark:text-white">
                            Add Promotion {i + 1}
                          </label>
                          <select
                            name="name"
                            id="name"
                            className="dark:bg-form-input"
                            value={inputList[i.name]}
                            onChange={(e) => {
                              console.log(e.target.value, 'e target value: ');
                              handleinputchange(
                                { name: 'name', value: e.target.value },
                                i
                              );
                            }}
                            // value={}
                          >
                            <option
                              value=""
                              selected={inputList[i]['name'] == ''}
                              disabled
                            >
                              Bir Printer Seçiniz
                            </option>
                            ;
                            {localPrinters.map((printer: string) => {
                              return (
                                <option
                                  selected={inputList[i]['name'] == printer}
                                  value={printer}
                                >
                                  {printer}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        <button
                          className="mt-2 flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-meta-1 p-2 text-white hover:bg-opacity-50 dark:border-strokedark dark:hover:bg-opacity-50"
                          onClick={(e: any) => {
                            handleremove(e, i);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  <button
                    className="flex min-w-42.5 items-center justify-center rounded-lg border border-stroke bg-gray p-2 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"
                    onClick={handleaddclick}
                  >
                    Add Printer
                  </button>
                </div>
                <button
                  type="submit"
                  className="my-3 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                >
                  Save Printers
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default Printer;
