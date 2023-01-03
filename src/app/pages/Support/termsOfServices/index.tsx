/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import { withTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Button, Group } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { RootState } from "@redux/store";
import { useParams } from "react-router-dom";
import PageContainer from "app/components/PageContainer/PageContainer";
import Spinner from "app/components/LoadingSpinner/Spinner";
import { fetchAsyncSupportDocsDetail } from "../slices";
import "./index.scss";

export function TermOfService() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [buttonGroup, setButtonGroup] = useState<any>([]);
  const { supportDocDetail, loading } = useAppSelector(
    (state: RootState) => state.support
  );
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(fetchAsyncSupportDocsDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (container.current && supportDocDetail.data) {
      container.current.innerHTML =
        supportDocDetail.data.content || ` <p> Nothing in this page</p>`;
    }
    const title: any = container.current?.getElementsByTagName("h3");
    const myArray: any = Array.from(title);
    setButtonGroup(myArray);
  }, [supportDocDetail.data]);

  return (
    <PageContainer>
      {!loading ? (
        <>
          <Group>
            {buttonGroup.map((btn, index) => (
              <Button
                key={index}
                onClick={() => {
                  btn.scrollIntoView({
                    block: "start",
                    behavior: "smooth",
                  });
                }}
              >
                {btn.textContent}
              </Button>
            ))}
          </Group>
          <div ref={container} />
        </>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  );
}

export default withTranslation()(TermOfService);
