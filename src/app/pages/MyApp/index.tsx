import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "@redux/hooks";

import PageContainer from "app/components/PageContainer/PageContainer";
import { getMyApps } from "./slice";

export function Application() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMyApps());
  }, [dispatch]);
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}

export default withTranslation()(Application);
