import { AdminLayout } from './layouts/AdminLayout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Operations } from './pages/Operations.jsx';

export default function App() {
  return <AdminLayout><Dashboard /><div className="mt-6"><Operations /></div></AdminLayout>;
}
