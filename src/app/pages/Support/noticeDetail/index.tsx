import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { RootState } from "@redux/store";
import { Title, Text, Button } from "@mantine/core";
import { withTranslation } from "react-i18next";
import TitleListDetail from "app/components/TitleListDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IconArrowLeft } from "@tabler/icons";
import { NOTICE } from "common";
import { fetchAsyncNoticeDetails } from "../slices";

function NoticeDetail({ t }) {
  const { id } = useParams();
  const { noticeDetails } = useAppSelector((state: RootState) => state.support);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncNoticeDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="py-10">
        <Title order={1}>{t("app.support.notice")}</Title>
        <Text>{t("app.support.noticeSubtitle")}</Text>
      </div>
      <Button
        variant="default"
        radius="xl"
        className="mb-5 "
        onClick={() => navigate(NOTICE)}
      >
        <IconArrowLeft width={20} height={20} />
      </Button>
      <TitleListDetail data={noticeDetails} type="notice" />
    </div>
  );
}

export default withTranslation()(NoticeDetail);
