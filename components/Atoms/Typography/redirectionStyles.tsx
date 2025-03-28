import { getLoadingRedirect } from "@/state/loading/loadingSelector"
import { IStore } from '@/state/types';
import { useSelector } from 'react-redux';
import { RedirectStyles } from "./styled"

export const CursorRedirectStyles = () => {
  const loadingRedirect = useSelector((state: IStore) => getLoadingRedirect(state))

  if (!loadingRedirect) return null;

  return (
      <RedirectStyles $isLoading={loadingRedirect} />
  );
};

export default CursorRedirectStyles;