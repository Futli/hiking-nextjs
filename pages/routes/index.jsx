import { api } from "../../services/hiking-service";
import { RoutesPage } from "../../components/pages/routes/routes-page/routes-page";


export default RoutesPage;

export async function getServerSideProps({ query }) {
  const routes = await api.getRoutes({ typeId: query.typeId || "" });
  const areas = await api.getAreas();
  return {
    props: { routes, areas },
  };
}
