"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "./context/cartcontext";
import { useEffect, useState }
from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const { addToCart, cartCount } = useCart();
  const [products, setProducts] = useState<any[]>([]);

useEffect(() => {
  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Products error:", error);
      return;
    }

    setProducts(data || []);
  };

  loadProducts();
}, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-green-700">SGAV</h1>
            <p className="text-xs text-gray-500">
              Healthcare & Wellness
            </p>
          </div>

          <nav className="hidden gap-6 text-sm font-medium sm:flex">
            <a href="#home">Home</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>

            <Link
              href="/cart"
              className="font-semibold text-green-700 hover:underline"
            >
              Cart({cartCount})
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="bg-green-50">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="mb-3 font-semibold text-green-700">
            TRUST • QUALITY • CARE
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
            Better Healthcare,
            <br />
            Better Life
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Welcome to SGAV. We are committed to providing quality
            healthcare products with a focus on trust and care.
          </p>

          <a
            href="#products"
            className="mt-8 inline-block rounded-full bg-green-700 px-7 py-3 font-semibold text-white hover:bg-green-800"
          >
            View Products
          </a>
        </div>
      </section>

      {/* Products */}
<section id="products" className="mx-auto max-w-6xl px-6 py-16">
  <div className="mb-10 text-center">
    <p className="font-semibold text-green-700">
      OUR PRODUCTS
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Featured Products
    </h2>
  </div>

  <div className="grid gap-8 sm:grid-cols-2">
    {products.map((product) => (
      <div
        key={product.id}
        className="rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="flex h-52 items-center justify-center rounded-xl bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-auto object-contain"
          />
        </div>

        <h3 className="mt-5 text-xl font-bold">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-600">
          {product.description}
        </p>

        <p className="mt-4 text-xl font-bold text-gray-900">
          ₹{product.price}
        </p>

        <button
          onClick={() =>
            addToCart({
              id: String(product.id),
              name: product.name,
              price: Number(product.price),
            })
          }
          className="mt-3 rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800"
        >
          Add to Cart
        </button>

        {product.name === "Sagliv" && (
          <Link
            href="/products/sagliv"
            className="ml-4 font-semibold text-green-700 hover:underline"
          >
            Know More →
          </Link>
        )}

        {product.name === "Sagcof-SF" && (
          <Link
            href="/products/sagcof-SF"
            className="ml-4 font-semibold text-green-700 hover:underline"
          >
            Know More →
          </Link>
        )}
      </div>
    ))}
  </div>
</section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 py-16 text-center"
      >
        <p className="font-semibold text-green-700">
          GET IN TOUCH
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Contact SGAV
        </h2>

        <p className="mt-4 text-gray-600">
          For product and business enquiries, contact us.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border bg-white p-8 text-left shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            SGAV Healthcare Private Limited
          </h3>

          <div className="mt-5 space-y-4 text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">
                Phone:
              </span>{" "}
              <a
                href="tel:7830826525"
                className="text-green-700 hover:underline"
              >
                7830826525
              </a>
            </p>

            <p>
              <span className="font-semibold text-gray-900">
                Phone:
              </span>{" "}
              <a
                href="tel:6398525047"
                className="text-green-700 hover:underline"
              >
                6398525047
              </a>
            </p>

            <p>
              <span className="font-semibold text-gray-900">
                Email:
              </span>{" "}
              <a
                href="mailto:ishurathibijnor@gmail.com"
                className="text-green-700 hover:underline"
              >
                ishurathibijnor@gmail.com
              </a>
            </p>

            <p>
              <span className="font-semibold text-gray-900">
                Address:
              </span>
              <br />
              House No. C/4, Roma Vihar Colony,
              <br />
              Sitapur-Jwalapur,
              <br />
              District Haridwar,
              <br />
              Uttarakhand – 249407
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-8 text-center text-sm text-gray-400">
        © 2026 SGAV. All rights reserved.
      </footer>
    </main>
  );
}