// Use global style
import "styles/global.scss";

import { withTranslation } from "react-i18next";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import Landing from "app/pages/HomePage";
import NotFoundPage from "app/components/NotFoundPage";
import {
  ABOUT,
  API,
  APPLICATION,
  APPLICATION_CREATE,
  APPLICATION_MODIFY,
  DOC,
  FORUM,
  MY_APP,
  SUPPORT,
  FAQ,
  NOTICE,
  DOCS,
  FAQ_DETAIL,
  NOTICE_DETAIL,
} from "common/routes";
import { NotificationsProvider } from "@mantine/notifications";
import AppThemeProvider from "./theme";
import AboutPage from "./pages/About";
import Document from "./pages/Document";
import Api from "./pages/Api";
import Forum from "./pages/Forum";
import MyApp from "./pages/MyApp";
import EntryPage from "./pages/Entrance";
import AppAction from "./pages/MyApp/Actions";
import FAQPage from "./pages/Support/faq";
import Notice from "./pages/Support/notice";
import TermsOfServices from "./pages/Support/termsOfServices";
import "config/axios";
import Support from "./pages/Support";
import FaqDetail from "./pages/Support/faqDetail";
import NoticeDetail from "./pages/Support/noticeDetail";
import AppDetail from "./pages/MyApp/Detail";
import AppList from "./pages/MyApp/List";
import Application from "./pages/Application";

function App({ i18n }) {
  return (
    <AppThemeProvider>
      <NotificationsProvider>
        <BrowserRouter basename="/live-api-openapi-frontweb">
          <Helmet
            titleTemplate="%s - Nexon Developer Center"
            defaultTitle="Nexon Developer Center"
            htmlAttributes={{ lang: i18n?.language || "en" }}
          >
            <meta name="description" content="A Nexon Developer Center " />
          </Helmet>

          <Routes>
            <Route element={<EntryPage />}>
              <Route index element={<Landing />} />
              <Route path={ABOUT} element={<AboutPage />} />
              <Route path={DOC} element={<Document />} />

              <Route path={API} element={<Api />}>
                <Route path=":gameName" element={<Api />}>
                  <Route path=":tabName" element={<Api />} />
                </Route>
              </Route>

              <Route path={SUPPORT} element={<Support />}>
                <Route path={FAQ} element={<FAQPage />} />
                <Route path={FAQ_DETAIL} element={<FaqDetail />} />
                <Route path={NOTICE} element={<Notice />} />
                <Route path={NOTICE_DETAIL} element={<NoticeDetail />} />
                <Route path={DOCS} element={<TermsOfServices />} />
              </Route>

              <Route path={FORUM} element={<Forum />} />
              <Route path={MY_APP} element={<MyApp />}>
                <Route index element={<AppList />} />
                <Route path={APPLICATION_CREATE} element={<AppAction />} />
                <Route
                  path={`${APPLICATION_MODIFY}/:id`}
                  element={<AppAction />}
                />
                <Route path=":id" element={<AppDetail />} />
              </Route>
              <Route path={APPLICATION} element={<Application />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </AppThemeProvider>
  );
}

export { App };
export default withTranslation()(App);
