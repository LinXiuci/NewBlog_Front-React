import { Suspense, lazy } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import AppIconLoading from "../common/components/AppLoading/AppIconLoading";

const App = lazy(() => import("../App"));
const AppHome = lazy(() => import("../views/Home/AppHome"));
/* 博客栏 */
const AppContent = lazy(() => import("../views/Content/AppContent"));
const AppFiling = lazy(() => import("../views/Filing/AppFiling"));

/* 相册页 */
const AppAlbum = lazy(() => import("../views/Album/AppAlbum"));
const AppAlbumClassification = lazy(() => import("../views/Album/page/classification-page"));
const AppAlbumdetailed = lazy(() => import("../views/Album/page/detailed-page"));

const AppFootmark = lazy(() => import("../views/Footmark/AppFootmark"));
const AppWuPin = lazy(() => import("../views/WuPin/AppWuPin"));
/* 作者栏 */
const AppIntroduction = lazy(() => import("../views/Introduction/AppIntroduction"));
const AppProject = lazy(() => import("../views/Project/AppProject"));
const AppFriend = lazy(() => import("../views/Friend/AppFriend"));

function AppRouter() {
  return (
    <Suspense fallback={<AppIconLoading />}>
      {/*  basename={process.env.PUBLIC_URL} */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<AppHome />}></Route>
            {/* 博客栏 */}
            <Route path="app-content" element={<AppContent />}></Route>
            <Route path="app-filing" element={<AppFiling />}></Route>
            {/* 影音栏 */}
            <Route path="app-album" element={<AppAlbum />}></Route>
            <Route path="app-footmark" element={<AppFootmark />}></Route>
            <Route path="app-wupin" element={<AppWuPin />}></Route>
            {/* 作者栏 */}
            <Route path="app-introduction" element={<AppIntroduction />}></Route>
            <Route path="app-project" element={<AppProject />}></Route>
            <Route path="app-friend" element={<AppFriend />}></Route>
          </Route>
          {/* <Route path="/*" element={<Exception404 />}></Route> */}
          <Route path="/app-album/classification" element={<AppAlbumClassification />}></Route>
          <Route path="/app-album/classification/detailed" element={<AppAlbumdetailed />}></Route>
        </Routes>
      </HashRouter>
    </Suspense>
  );
}

export default AppRouter;
