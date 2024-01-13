import Breadcrumb from '../components/Breadcrumb';
import { DashboardProductsTable } from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <DashboardProductsTable />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
