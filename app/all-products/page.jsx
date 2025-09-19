import { productsDummyData } from "@/assets/assets";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import AllProductsClient from "@/components/AllProductsClient";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "All Products - QuickCart",
    description: "Browse all products on QuickCart",
  };
}

export default async function AllProductsPage() {
  let products = productsDummyData;
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await Product.find({}, null, { lean: true }).catch(() => []);
      if (docs && docs.length) {
        products = docs.map(d => ({ ...d, _id: String(d._id) }));
      }
    }
  } catch (e) {
    // fallback to dummy data
  }
  return <AllProductsClient products={products} />;
}
