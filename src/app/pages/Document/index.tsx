/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Group, Button, createStyles } from "@mantine/core";
import { RootState } from "@redux/store";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import PageContainer from "app/components/PageContainer/PageContainer";
import Spinner from "app/components/LoadingSpinner/Spinner";
import { fetchAsyncDocs } from "./slice";

const useStyles = createStyles((theme) => ({
  contentDocs: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.dark[9]
    }`,
    borderRadius: "20px",
    marginTop: "20px",
  },
  mainContent: {
    margin: "40px",
  },
}));

export function Document() {
  const { posts, loading } = useAppSelector(
    (state: RootState) => state.dataDocs
  );
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      fetchAsyncDocs({
        params: { limit: 5, search: "docs", filter: true },
        signal: controller.signal,
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  const { content } = posts[active] || "<p>Not found</p>";

  const grpBtn = posts.map((element, index) => (
    <div key={index}>
      <Button
        onClick={() => {
          setActive(index);
        }}
        variant={active === index ? "filled" : "outline"}
        size="xl"
        radius="xl"
      >
        {element.tabName}
      </Button>
    </div>
  ));
  const showBtn = () => grpBtn;
  console.log(loading);

  return (
    <PageContainer>
      {loading && <Spinner />}
      <div>
        <h4>Shall we start the developer center?</h4>
        <Group>{showBtn()}</Group>
        {content ? (
          <div className={classes.contentDocs}>
            <div className={classes.mainContent}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        ) : (
          <h3 className="text-center">
            <Spinner />
          </h3>
        )}
      </div>
    </PageContainer>
  );
}

export default withTranslation()(Document);
