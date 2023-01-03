/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { useEffect, useState } from "react";
import {
  // createStyles,
  Table,
  ScrollArea,
  Text,
  Grid,
  Select,
  Input,
  Pagination,
  createStyles,
  LoadingOverlay,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import dayjs from "dayjs";

import { useDebouncedValue } from "@mantine/hooks";
import { ApiResponse } from "common/type";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchAsyncFAQ } from "app/pages/Support/slices";
import { RootState } from "@redux/store";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../LoadingSpinner/Spinner";

interface ITittleList {
  listData: any;
  handleSearch: (params: any) => void;
}

export default function TitleList({ handleSearch, listData }: ITittleList) {
  const [, setScrolled] = useState(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [debounced] = useDebouncedValue(search, 900);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState("10");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading } = useAppSelector((state: RootState) => state.support);

  const useStyles = createStyles((theme) => ({
    title: {
      textDecoration: "none",
      fontWeight: "bold",
      color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[7],
    },
  }));

  const { classes } = useStyles();

  useEffect(() => {
    handleSearch({ search: debounced, page, limit });
  }, [debounced, page, limit, dispatch, handleSearch]);

  const columns = [
    {
      key: "title",
      width: "90%",
      render: (obj) => (
        // eslint-disable-next-line no-underscore-dangle
        <Link to={obj._id} className={classes.title}>
          {obj.title}
        </Link>
      ),
    },
    {
      key: "updatedAt",
      width: "10%",
      render: (obj) =>
        obj.updatedAt && dayjs(obj.updatedAt).format("YYYY.MM.DD"),
    },
  ];

  const rows = listData?.data?.map((row) => (
    <tr className="text-left" key={row.title}>
      {columns.map((column) => (
        <td style={{ width: column.width }} key={column.key}>
          {column.render ? column.render(row) : row[`${column.key}`]}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="relative">
      {loading && <LoadingOverlay visible />}
      <Grid>
        <Input
          placeholder="Keyword"
          className="w-[300px] mr-1"
          mb="md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          rightSection={<IconSearch size={14} strokeWidth={1.5} />}
        />
        <Select
          defaultValue={limit}
          placeholder="Pick"
          className="w-[120px]"
          onChange={(e) => {
            setLimit(e || "");
          }}
          mb="lg"
          data={[
            { value: "10", label: "10 things" },
            { value: "50", label: "50 things" },
            { value: "100", label: "100 things" },
          ]}
        />
      </Grid>
      <ScrollArea
        sx={{ height: 750 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="lg"
          sx={{ tableLayout: "fixed", minWidth: 700 }}
        >
          <tbody>
            {rows && rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td
                  colSpan={
                    listData && listData.data.length > 0
                      ? Object.keys(listData.data[0]).length
                      : 0
                  }
                >
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      <Grid justify="center">
        {listData.extra.totalPage > 0 && (
          <Pagination
            page={listData.extra.page + 1}
            total={listData.extra.totalPage}
            onChange={(value) => setPage(value - 1)}
          />
        )}
      </Grid>
    </div>
  );
}
