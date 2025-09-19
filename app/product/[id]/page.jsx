import { productsDummyData } from "@/assets/assets";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  let products = productsDummyData;
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const docs = await Product.find({}, { _id: 1 }, { lean: true }).catch(() => []);
      if (docs && docs.length) {
        products = docs.map(d => ({ _id: String(d._id) }));
      }
    }
  } catch (e) {}
  return products.map(p => ({ id: p._id }));
}

export async function generateMetadata({ params }) {
  let products = productsDummyData;
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const doc = await Product.findById(params.id, null, { lean: true }).catch(() => null);
      if (doc) {
        const product = { ...doc, _id: String(doc._id) };
        return {
          title: `${product.name} - QuickCart`,
          description: product.description?.slice(0, 140),
          openGraph: {
            title: product.name,
            description: product.description?.slice(0, 200),
            images: product.image?.length ? [{ url: product.image[0] }] : [],
          }
        };
      }
    }
  } catch (e) {}
  const product = products.find(p => p._id === params.id);
  if (!product) return { title: "Product - QuickCart" };
  return {
    title: `${product.name} - QuickCart`,
    description: product.description?.slice(0, 140),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 200),
      images: product.image?.length ? [{ url: product.image[0] }] : [],
    }
  };
}

export default async function ProductPage({ params }) {
  let products = productsDummyData;
  let product = null;
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const doc = await Product.findById(params.id, null, { lean: true }).catch(() => null);
      if (doc) product = { ...doc, _id: String(doc._id) };
      if (!product) {
        const docs = await Product.find({}, null, { lean: true }).catch(() => []);
        if (docs?.length) products = docs.map(d => ({ ...d, _id: String(d._id) }));
      }
    }
  } catch (e) {}
  if (!product) product = products.find(p => p._id === params.id) || null;
  return <ProductDetailsClient product={product} products={products} />;
}