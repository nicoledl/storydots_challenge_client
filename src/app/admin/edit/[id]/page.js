import PrivateRoute from "@/components/admin/PrivateRoute";
import ProductForm from "@/components/admin/ProductForm";

function Home({ params }) {
  return (
    <main>
      <PrivateRoute>
        <ProductForm method={'PUT'} id={params.id}/>
      </PrivateRoute>
    </main>
  );
}

export default Home