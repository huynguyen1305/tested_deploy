/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { faker } from "@faker-js/faker";
import {
  List,
  Space,
  Title,
  Text,
  CopyButton,
  Tooltip,
  ActionIcon,
  Group,
  Stack,
  Select,
  Divider,
  TextInput,
  Textarea,
  Button,
  Image,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { IconCheck, IconCopy } from "@tabler/icons";
import { APPLICATION_MODIFY } from "common";
import { AppType } from "domain/application";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatFullTime } from "utils/time";
import { getAppDetail } from "./slice";
import { selectApplicationDetail } from "./slice/selector";

const gameSelection = [
  {
    label: "Kart rider",
    value: "634516ce84b8bd8a12965359",
  },
  {
    label: "Maple story",
    value: "6357b2593ac14976bbcd043e",
  },
  {
    label: "FiFa Online 4",
    value: "6357b2593ac14976bbcd038e",
  },
];

const typeSelections = [
  {
    label: "Develop",
    value: AppType.develop,
  },
  {
    label: "Service",
    value: AppType.service,
  },
];

export default function AppDetail() {
  const { id } = useParams();
  const data = useAppSelector((state) =>
    selectApplicationDetail(state, id || "1")
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching");

    dispatch(getAppDetail(id!));
  }, [dispatch, id]);

  return (
    <div>
      <Title order={2}>Application Detail</Title>
      <div className="pb-60 min-w-0 ">
        <Space />
        {data && (
          <List
            styles={(theme) => ({
              itemWrapper: {
                width: "100%",
              },
            })}
          >
            <Stack spacing="lg">
              <List.Item className="w-full">
                <Title order={4}>Token information</Title>
                <List
                  withPadding
                  listStyleType="none"
                  className="overflow-hidden"
                  styles={(theme) => ({
                    itemWrapper: {
                      width: "100%",
                    },
                  })}
                >
                  <Stack className=" min-w-0 flex">
                    <List.Item className="min-w-0 ">
                      <CopyButton value={data.token?.token} timeout={2000}>
                        {({ copied, copy }) => (
                          <Tooltip
                            label={copied ? "Copied" : "Copy"}
                            withArrow
                            position="right"
                          >
                            <Group className="w-fit">
                              <Text weight={500}>Development token</Text>
                              <ActionIcon
                                color={copied ? "teal" : "gray"}
                                onClick={copy}
                              >
                                {copied ? (
                                  <IconCheck size={16} />
                                ) : (
                                  <IconCopy size={16} />
                                )}
                              </ActionIcon>
                            </Group>
                          </Tooltip>
                        )}
                      </CopyButton>
                      <Text className="break-words">{data?.token?.token}</Text>
                    </List.Item>

                    <List.Item>
                      <Text weight={500}>Issue date</Text>
                      <Text>{formatFullTime(data?.token?.createdAt)}</Text>
                    </List.Item>
                    <List.Item>
                      <Text weight={500}>Expire date</Text>
                      <Text>{formatFullTime(data?.token?.expiredAt)}</Text>
                    </List.Item>
                  </Stack>
                </List>
              </List.Item>
              <Divider />
              <List.Item>
                <Title order={4}>Application information</Title>
                <List
                  listStyleType="none"
                  withPadding
                  styles={(theme) => ({
                    itemWrapper: {
                      width: "100%",
                    },
                  })}
                >
                  <Stack>
                    <List.Item>
                      <Stack>
                        <Select
                          size="md"
                          disabled
                          label="What kind of game will you make the application with?"
                          description="(Up to 3 tokens per game are issued)"
                          placeholder="Game selection"
                          withAsterisk
                          searchable
                          required
                          value={data.gameId}
                          nothingFound="No options"
                          data={gameSelection}
                        />

                        <Select
                          size="md"
                          disabled
                          label="Is it still in development stage? Or is it a service launch stage?"
                          description="(Development and service token restriction policies are different.)"
                          placeholder="Game selection"
                          withAsterisk
                          required
                          value={data.type}
                          searchable
                          nothingFound="No options"
                          data={typeSelections}
                        />

                        <Text weight={600} size="md">
                          Please set the service name, URL, service description,
                          and representative image information to be released.
                        </Text>
                        <TextInput
                          disabled
                          value={data.name}
                          // required
                          size="md"
                          placeholder="Application name"
                        />

                        {data.type === AppType.service && (
                          <>
                            <TextInput
                              size="md"
                              disabled
                              value={data.url}
                              placeholder="Application url"
                            />
                            <Textarea
                              disabled
                              size="md"
                              value={data.description}
                              placeholder="Application description"
                              minRows={4}
                            />

                            {data.imageUrl && (
                              <Image
                                styles={(themeObj) => ({
                                  placeholder: {
                                    backgroundColor:
                                      themeObj.colorScheme === "dark"
                                        ? themeObj.colors.dark[6]
                                        : themeObj.colors.gray[2],
                                  },
                                })}
                                radius="md"
                                src={data.imageUrl}
                                width={200}
                                height={200}
                                withPlaceholder
                                alt="Application image"
                              />
                            )}
                          </>
                        )}
                      </Stack>

                      <Space h="lg" />
                      <Group spacing="sm" position="center">
                        <Button
                          size="md"
                          onClick={() =>
                            navigate(`../${APPLICATION_MODIFY}/${id}`)
                          }
                        >
                          Modify
                        </Button>
                        <Button
                          size="md"
                          variant="default"
                          onClick={() => navigate(-1)}
                        >
                          Cancel
                        </Button>
                      </Group>
                    </List.Item>
                  </Stack>
                </List>
              </List.Item>
            </Stack>
          </List>
        )}
      </div>
    </div>
  );
}
