import ProductForm from "@/components/admin/ProductForm";

export default function Home() {
  return (
    <main>
      <ProductForm method={'POST'} />
    </main>
  );
}
