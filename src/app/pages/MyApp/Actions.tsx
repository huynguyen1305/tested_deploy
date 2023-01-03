/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Input,
  LoadingOverlay,
  ScrollArea,
  Select,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";
import { Application, AppType } from "domain/application";
import { FileWithPath } from "@mantine/dropzone";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "common/string";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { APPLICATION_MODIFY } from "common";
import removeEmpty from "utils/removeEmpty";
import { IconLoader, IconQuestionMark } from "@tabler/icons";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import fakeNetwork from "utils/fakeNetwork";
import { RequiredField } from "utils/type";
import readFileAsync from "utils/readFileAsync";
import Spinner from "app/components/LoadingSpinner/Spinner";
import ImageUpload from "./components/Upload";
import { selectApplicationModify } from "./slice/selector";
import { createApp, getAppDetail, setLoading, updateApp } from "./slice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// from value interface
// interface FV {
//   gameId: string
//   name: string
//   description: string
//   icon: File | string
//   type: AppType
//   url: string
//   useDefaultIcon: boolean
// }

type FV = Pick<
  Application,
  "gameId" | "name" | "description" | "type" | "url"
> & { icon: File | string; useDefaultIcon: boolean };

const validateImage = (file: FileWithPath) => {
  if (file.size <= MAX_FILE_SIZE) {
    return file;
  }
  return undefined;
};

const finitialValues: FV = {
  gameId: "",
  name: "",
  description: "",
  icon: "",
  type: AppType.develop,
  url: "",
  useDefaultIcon: false,
};

const formatFormData = (values: FV) => {
  if (values.type !== AppType.service) {
    values.icon = "";
    values.url = undefined;
    values.description = undefined;
  }
  const cleanedValues = removeEmpty<FV>(values);
  if (cleanedValues.useDefaultIcon) {
    delete cleanedValues.icon;
  }
  delete cleanedValues.useDefaultIcon;
  return cleanedValues as Required<FV>;
};

export default function AppAction() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const modifying = location.pathname.includes(APPLICATION_MODIFY);
  const data = useAppSelector((state) =>
    selectApplicationModify(state, id || "1")
  );
  const loading = useAppSelector((state) => state.application.loading);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: finitialValues, // setting form initial value could fix react error: Component changing from uncontrolled to controlled
    validate: {
      name: (value) =>
        !value || value.length < 1 ? "Application name is required" : null,
      icon: (value, fields) =>
        fields.type === AppType.service && !fields.useDefaultIcon && !value
          ? "Application icon is required"
          : null,
      url: (value, fields) =>
        // eslint-disable-next-line no-nested-ternary
        fields.type === AppType.service && value
          ? // eslint-disable-next-line prefer-regex-literals
            new RegExp(
              // eslint-disable-next-line no-control-regex
              "/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi"
            ).test(value)
            ? null
            : "Invalid Url"
          : null,
    },
  });

  const handleFormSubmit = async (values) => {
    if (form.isTouched()) {
      if (form.isValid()) {
        const formData = formatFormData(values);

        try {
          dispatch(setLoading(true));
          if (modifying && id) {
            if (formData.icon && formData.icon instanceof File) {
              // upload stuff
              // but we are mocking, so we just use the ObjectUrl
              dispatch(
                updateApp({
                  ...formData,
                  id,
                  imageUrl: URL.createObjectURL(formData.icon),
                })
              );
            } else dispatch(updateApp({ ...formData, id }));
          } else if (formData.icon && formData.icon instanceof File) {
            // upload stuff
            // but we are mocking, so we just use the ObjectUrl
            dispatch(
              createApp({
                ...formData,
                imageUrl: URL.createObjectURL(formData.icon),
              })
            );
          } else dispatch(createApp(formData));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));

          // eslint-disable-next-line no-alert, no-undef
          alert(error);
        }
      }
    } else console.error(values);
  };

  const addImage = (fileList: FileWithPath[]) => {
    if (fileList.length <= MAX_FILE_COUNT) {
      const image = validateImage(fileList[0]);
      if (image) {
        form.setFieldValue("icon", image);
      } else {
        // eslint-disable-next-line no-alert, no-undef
        alert("File size is too large");
      }
    }
  };

  useEffect(() => {
    if (data) {
      form.setValues({
        ...data,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (modifying) {
      dispatch(getAppDetail(id!));
      form.setValues({ ...data });
    }
  }, [data, dispatch, form, id, modifying]);

  return (
    <>
      <Title order={2}>
        {modifying ? "Edit application" : "Register Application"}
      </Title>

      <div className="relative">
        {loading && <Spinner />}
        <form
          onSubmit={form.onSubmit((values, event) => {
            event.preventDefault();
            handleFormSubmit(values).then((res) => {
              navigate(-1);
            });
          })}
        >
          <Stack spacing="lg">
            <Select
              size="md"
              label="What kind of game will you make the application with?"
              description="(Up to 3 tokens per game are issued)"
              placeholder="Game selection"
              withAsterisk
              searchable
              required
              nothingFound="No options"
              data={gameSelection}
              {...form.getInputProps("gameId")}
            />
            <Select
              size="md"
              label="Is it still in development stage? Or is it a service launch stage?"
              description="(Development and service token restriction policies are different.)"
              placeholder="Game selection"
              withAsterisk
              required
              searchable
              nothingFound="No options"
              data={typeSelections}
              {...form.getInputProps("type")}
            />

            <Text weight={600} size="md">
              Please set the service name, URL, service description, and
              representative image information to be released.
            </Text>
            <TextInput
              // required
              size="md"
              placeholder="Application name"
              {...form.getInputProps("name")}
            />
            {form.values.type === AppType.service && (
              <>
                <TextInput
                  size="md"
                  placeholder="Application url"
                  {...form.getInputProps("url")}
                />
                <Textarea
                  size="md"
                  placeholder="Application description"
                  minRows={4}
                  {...form.getInputProps("description")}
                />

                <Input.Wrapper
                  size="md"
                  label="Upload an image"
                  description="Upload an image to be used as a representative image of the service."
                  {...form.getInputProps("icon")}
                >
                  <Stack className="pt-[10px]" spacing={10}>
                    <Checkbox
                      size="md"
                      id="has-image-upload"
                      label={
                        <Group className="inline-flex">
                          <Text>I dont have any image</Text>
                          <Tooltip label="If no image uploaded, we will use our default image ">
                            <ThemeIcon
                              variant="light"
                              radius="xl"
                              color="gray"
                              size={18}
                            >
                              <IconQuestionMark />
                            </ThemeIcon>
                          </Tooltip>
                        </Group>
                      }
                      {...form.getInputProps("useDefaultIcon", {
                        type: "checkbox",
                      })}
                    />

                    <ImageUpload
                      setImage={(v) => {
                        form.setFieldValue("icon", v);
                      }}
                      onDrop={addImage}
                      disabled={form.values.useDefaultIcon}
                      imageSrc={
                        // if icon is a string, use it as image src else parse it as file
                        // eslint-disable-next-line no-nested-ternary
                        form.getInputProps("icon").value
                          ? typeof form.getInputProps("icon").value !== "string"
                            ? URL.createObjectURL(
                                form.getInputProps("icon").value
                              )
                            : form.getInputProps("icon").value
                          : undefined
                      }
                    />
                  </Stack>
                </Input.Wrapper>
              </>
            )}

            {!modifying && (
              <>
                <Title order={4}>
                  Please read and agree to the Nexon Developer Center Terms of
                  Service.
                </Title>
                <ScrollArea
                  styles={(theme) => ({
                    viewport: {
                      paddingRight: 12,
                      paddingLeft: 12,
                      height: 200,
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[7]
                          : theme.white,
                    },
                  })}
                >
                  <div>
                    NEXON DEVELOPER CENTER TERM OF SERVICE
                    <br />
                    <br />
                    Amet consectetur adipisicing elit. Quibusdam praesentium
                    quae iusto alias accusantium repellat id hic, labore iste,
                    perferendis nam odit blanditiis commodi explicabo. Amet rem
                    minima reprehenderit! Blanditiis? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Ad accusantium, sapiente cum
                    corporis voluptate sit nostrum sed optio fuga praesentium
                    reprehenderit cupiditate deleniti recusandae quis tempora
                    eaque alias porro reiciendis? Lorem, ipsum dolor sit amet
                    consectetur
                    <br />
                    Adipisicing elit. Dolorum molestias laudantium nemo fugit
                    vel facilis, ex ipsa distinctio, sed, earum ullam unde
                    quisquam dolorem deserunt adipisci laborum corporis autem.
                    Deserunt! molestias laudantium nemo fugit vel facilis, ex
                    ipsa distinctio, sed, earum ullam unde quisquam dolorem
                    deserunt adipisci laborum corporis autem. Deserunt!
                    molestias laudantium nemo fugit vel facilis, ex ipsa
                    distinctio, sed, earum ullam unde quisquam dolorem deserunt
                    adipisci laborum corporis autem. Deserunt!
                    <br /> Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Quibusdam praesentium quae iusto alias accusantium
                    repellat id hic, labore iste, perferendis nam odit
                    blanditiis commodi explicabo. Amet rem minima reprehenderit!
                    Blanditiis? Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Ad accusantium, sapiente cum corporis
                    voluptate sit nostrum sed optio fuga praesentium
                    reprehenderit cupiditate deleniti recusandae quis tempora
                    eaque alias porro reiciendis? Lorem,
                    <br />
                    Ipsum dolor sit amet consectetur adipisicing elit. Dolorum
                    molestias laudantium nemo fugit vel facilis, ex ipsa
                    distinctio, sed, earum ullam unde quisquam dolorem deserunt
                    adipisci laborum corporis autem. Deserunt! molestias
                    laudantium nemo fugit vel facilis, ex ipsa distinctio, sed,
                    earum ullam unde quisquam
                    <br />
                    Dolorem deserunt adipisci laborum corporis autem. Deserunt!
                    molestias laudantium nemo fugit vel facilis, ex ipsa
                    distinctio, sed, earum ullam unde quisquam dolorem deserunt
                    adipisci laborum corporis autem. Deserunt!
                  </div>
                </ScrollArea>

                <Checkbox
                  size="md"
                  required
                  label="I agree to the Nexon Developer Center Terms of Service."
                />
              </>
            )}
          </Stack>

          <Space h="lg" />
          <Group spacing="sm" position="center">
            <Button size="md" type="submit">
              {modifying ? "Save" : "Register"}
            </Button>
            <Button size="md" variant="default" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
}
