import PageLayout from "../components/common/PageLayout";
import Fave from "../features/cart/Fave";

const FavePage = () => {
  return <PageLayout child={<Fave />} />;
};

export default FavePage;
