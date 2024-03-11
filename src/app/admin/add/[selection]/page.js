import BrandForm from "@/components/admin/BrandForm";
import ProductForm from "@/components/admin/ProductForm";

export default function Home({add}) {

  return (
    <main>
      {add === 'product' ? <ProductForm method={'POST'} /> : <BrandForm method={'POST'} />}
    </main>
  );
}
