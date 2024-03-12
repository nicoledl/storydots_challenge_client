import BrandForm from "@/components/admin/BrandForm";
import PrivateRoute from "@/components/admin/PrivateRoute";
import ProductForm from "@/components/admin/ProductForm";

function Home({params}) {
  return (
    <main style={{marginTop: 50}}>
      <PrivateRoute>
        {params.selection === 'products' ? <ProductForm method={'POST'} /> : <BrandForm />}
      </PrivateRoute>
    </main>
  );
}

export default Home