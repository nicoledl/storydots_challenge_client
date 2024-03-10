import ProductForm from "@/components/admin/ProductForm";

export default function Home({ params }) {
  return (
    <main>
      <ProductForm method={'PUT'} id={params.id}/>
    </main>
  );
}
