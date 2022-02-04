import { api } from "../../services/hiking-service";
import { PlacesPage } from "../../components/pages/places/places-page/places-page";


export default PlacesPage;

export async function getServerSideProps({ query }) {
  const places = await api.getPlaces({ typeId: query.typeId || "" });
  const areas = await api.getAreas();
  
  return {
    props: { places, areas },
  };
}
