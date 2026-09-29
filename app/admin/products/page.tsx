"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !imageFile) {
      alert("Product name, price and image are required.");
      return;
    }

    setLoading(true);

    const fileName =
      Date.now() + "-" + imageFile.name.replace(/\s+/g, "-");

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      setLoading(false);
      alert("Image upload failed: " + uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    const { error } = await supabase.from("products").insert({
      name,
      price: Number(price),
      description,
      image: publicUrlData.publicUrl,
      active: true,
    });

    setLoading(false);

    if (error) {
      alert("Product could not be added: " + error.message);
      return;
    }

    alert("Product added successfully!");

    setName("");
    setPrice("");
    setDescription("");
    setImageFile(null);

    const fileInput = document.getElementById(
      "product-image"
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
       
       <div className="mb-6 flex flex-wrap gap-3">
  <a
    href="/admin/orders"
    className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800"
  >
    Orders
  </a>

  <a
    href="/admin/products"
    className="rounded-lg border border-green-700 px-5 py-2 font-semibold text-green-700 hover:bg-green-50"
  >
    Products
  </a>

  <button
    onClick={async () => {
      await supabase.auth.signOut();
      window.location.href = "/admin/login";
    }}
    className="rounded-lg bg-black px-5 py-2 font-semibold text-white hover:bg-gray-800"
  >
    Logout
  </button>
</div>
 <h1 className="text-3xl font-bold text-black">
          Add New Product
        </h1>

        <div className="mt-8 space-y-5">
          <div>
            <label className="font-semibold text-black">
              Product Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">
              Price (₹)
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              rows={5}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
            />
          </div>

          <div>
            <label className="font-semibold text-black">
              Product Image
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-black"
            />
          </div>

          <button
            onClick={addProduct}
            disabled={loading}
            className="w-full rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </div>
    </main>
  );
}