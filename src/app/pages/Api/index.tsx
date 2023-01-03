/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PageContainer from "app/components/PageContainer/PageContainer";
import { withTranslation } from "react-i18next";
import {
  Accordion,
  Box,
  Col,
  createStyles,
  Grid,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { RootState } from "@redux/store";
import { useParams } from "react-router-dom";
import Spinner from "app/components/LoadingSpinner/Spinner";
import {
  getApiList,
  getGameList,
  setGameSelected,
  setTabNameSelected,
} from "./slice";
import ApiDetail from "./ApiDetail";

const useStyles = createStyles((theme) => {
  const borderColor =
    theme.colorScheme === "dark"
      ? `${theme.colors.dark[4]}!important`
      : `${theme.colors.gray[3]}!important`;
  // const bgColor =
  //   theme.colorScheme === 'dark'
  //     ? `#25262b`
  //     : `${theme.colors.gray[3]}!important`
  return {
    accordionActive: {
      control: {
        "&[data-active]": {
          backgroundColor: "red",
        },
      },
    },
    borderBottomText: {
      borderBottom: `1px solid ${borderColor}`,
    },
  };
});

export function Apis() {
  const { loading, apiList, gameNameList, gameSelected, tabNameSelected } =
    useAppSelector((state: RootState) => state.apis);
  const { classes, theme } = useStyles();
  const dispatch = useAppDispatch();
  const paramDom = useParams();

  const handleChangeGame = (value) => {
    if (value) {
      dispatch(setGameSelected(value));
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      getGameList({
        params: { page: 0, limit: 0 },
        signal: controller.signal,
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(
      getApiList({
        params: {
          page: 0,
          limit: 0,
          gameName: gameSelected.gameName,
        },
        signal: controller.signal,
      })
    );
    return () => {
      controller.abort();
    };
  }, [dispatch, gameSelected.gameName]);

  useEffect(() => {
    if (paramDom.gameName) {
      dispatch(setGameSelected(paramDom.gameName));
    }
  }, [dispatch, paramDom.gameName]);

  return (
    <PageContainer>
      <div className="relative">
        {loading && <Spinner />}
        <Stack sx={{ padding: "2rem" }}>
          <Grid>
            <Col span={3}>
              <Select
                size="lg"
                data={gameNameList}
                defaultValue={gameSelected.gameName}
                value={gameSelected.gameName}
                searchable
                onChange={handleChangeGame}
              />
            </Col>
          </Grid>
          <br />
          <Grid>
            {gameSelected.tabNameList &&
              gameSelected.tabNameList.length > 0 &&
              gameSelected.tabNameList.map((item: any) => (
                <Box
                  key={item.tabName}
                  className={
                    tabNameSelected === item ? "bg-gray-400 text-white" : ""
                  }
                  sx={{
                    borderRadius: "2rem",
                    color: theme.colorScheme === "dark" ? "white" : "black",
                    padding: "0.5rem 1.5rem",
                    margin: "8px",
                    border: "1px solid grey",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatch(setTabNameSelected(item))}
                >
                  {item.tabName}
                </Box>
              ))}
          </Grid>
          <br />
          <Stack>
            {tabNameSelected &&
              tabNameSelected.category2List.length > 0 &&
              tabNameSelected.category2List.map((item) => (
                <div key={item}>
                  <Title order={4}>{item}</Title>
                  <br />
                  <Accordion
                    variant="separated"
                    radius="md"
                    defaultValue={[]}
                    multiple
                    styles={{
                      control: {
                        "&[data-active]": {
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? "#25262b"
                              : "#f8f9fa",
                        },
                      },
                    }}
                  >
                    {item &&
                      apiList &&
                      apiList.length > 0 &&
                      apiList.map((api) => {
                        if (
                          api.category2 === item &&
                          api.tabName === tabNameSelected.tabName
                        ) {
                          return <ApiDetail key={api.apiId} data={api} />;
                        }
                        return null;
                      })}
                  </Accordion>
                </div>
              ))}
            <br />
            {apiList &&
              apiList.length > 0 &&
              apiList.map((api) => {
                if (
                  api.category2 === "Uncheck" &&
                  api.tabName === tabNameSelected.tabName
                ) {
                  return (
                    <Accordion
                      variant="separated"
                      radius="md"
                      defaultValue={[]}
                      multiple
                      styles={{
                        control: {
                          "&[data-active]": {
                            backgroundColor:
                              theme.colorScheme === "dark"
                                ? "#25262b"
                                : "#f8f9fa",
                          },
                        },
                      }}
                    >
                      <ApiDetail key={api.apiId} data={api} />
                    </Accordion>
                  );
                }
                return null;
              })}
          </Stack>
        </Stack>
      </div>
    </PageContainer>
  );
}

export default withTranslation()(Apis);
