"use client";

import { useEffect, useState } from "react";
import { getProducts, createProduct, deleteProduct } from "./actions";

// Define the Product type based on your Prisma output
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await getProducts();
    setProducts(data as any);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const result = await deleteProduct(id);
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert("Failed to delete product: " + result.error);
    }
  }

  async function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await createProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      description: formData.description,
    });

    if (result.success) {
      await fetchData(); // Refresh the list
      setIsModalOpen(false);
      setFormData({ name: "", price: "", stock: "", description: "" });
    } else {
      setError(result.error || "Something went wrong");
    }
    
    setIsSubmitting(false);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your live store inventory with Prisma.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[var(--v-blue)] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-[var(--v-blue)]/20 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 font-mono border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-1/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-8 ml-auto"></div></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="w-12 h-12 rounded-full bg-slate-50 mx-auto flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="font-medium text-slate-900">No products found</p>
                    <p className="text-xs mt-1">Get started by adding your first product.</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-xs">{product.slug}</p>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-slate-900">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                        product.stock > 10 ? "bg-emerald-100 text-emerald-700" :
                        product.stock > 0 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                      }`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Product"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSubmitting && setIsModalOpen(false)} />
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900 font-display">Add New Product</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--v-blue)] focus:ring-4 focus:ring-[var(--v-blue)]/10"
                  placeholder="e.g. Wireless Earbuds Pro"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-2">Price (₦)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--v-blue)] focus:ring-4 focus:ring-[var(--v-blue)]/10"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-2">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--v-blue)] focus:ring-4 focus:ring-[var(--v-blue)]/10"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono mb-2">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--v-blue)] focus:ring-4 focus:ring-[var(--v-blue)]/10 resize-none"
                  placeholder="Product details..."
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs font-mono bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
              )}

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold bg-[var(--v-blue)] text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-[var(--v-blue)]/20 disabled:opacity-70 flex items-center gap-2"
                >
                  {isSubmitting && (
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  )}
                  {isSubmitting ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}