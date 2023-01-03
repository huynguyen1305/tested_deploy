import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { RootState } from "@redux/store";
import { Title, Text, Button } from "@mantine/core";
import { withTranslation } from "react-i18next";
import TitleListDetail from "app/components/TitleListDetail";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IconArrowLeft } from "@tabler/icons";
import { FAQ as faq } from "common";
import { fetchAsyncFAQDetail } from "../slices";

function FAQ({ t }) {
  const { id } = useParams();
  const { FAQDetails } = useAppSelector((state: RootState) => state.support);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAsyncFAQDetail(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="py-10">
        <Title order={1}>{t("app.support.FAQ")}</Title>
        <Text>{t("app.support.FAQsubtitle")}</Text>
      </div>
      <Button
        variant="default"
        radius="xl"
        className="mb-5 "
        onClick={() => navigate(faq)}
      >
        <IconArrowLeft width={20} height={20} />
      </Button>
      <TitleListDetail data={FAQDetails} type="faq" />
    </div>
  );
}

export default withTranslation()(FAQ);
