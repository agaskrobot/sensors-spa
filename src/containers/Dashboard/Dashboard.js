import { FlashMessage } from '../../components';
import DashboardRouter from './DashboardRouter';

export function Dashboard() {
  return (
    <div className="relative flex flex-grow h-full justify-start min-w-1280">
      <div className="flex flex-col h-full w-full">
        <FlashMessage className="absolute top-0 mt-16" />
        <div className="flex flex-col h-full w-full p-5 bg-purple-100">
          <DashboardRouter />
        </div>
      </div>
    </div>
  );
}
