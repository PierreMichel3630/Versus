import { useRoutes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ConfigPage } from "../pages/ConfigPage";
import { PlayPage } from "src/pages/PlayPage";
import { ThemesPage } from "src/pages/ThemesPage";
import { ThemePage } from "src/pages/ThemePage";
import { RankingPage } from "src/pages/RankingPage";

export default function ThemeRoutes() {
  const routes = [
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/",
          element: <ThemesPage />,
        },
        {
          path: "/theme/:id",
          element: <ThemePage />,
        },
        {
          path: "/play",
          element: <ConfigPage />,
        },
        {
          path: "/ranking",
          element: <RankingPage />,
        },
      ],
    },
    {
      path: "/play/:id",
      element: <PlayPage />,
    },
  ];
  return useRoutes([...routes]);
}
