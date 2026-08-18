import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../types/Product';
import { ProductCard } from '../components/ProductCard';
import { Navbar } from '../components/NavBar';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      const response = await api.get<Product[]>('/products');

      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />

      <main>
        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
                StockGuard
              </span>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                Produtos disponíveis em estoque
              </h1>

              <p className="mt-4 text-lg text-zinc-500">
                Encontre rapidamente os produtos disponíveis em nossa loja.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-5 py-4 outline-none transition focus:border-zinc-900"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-5 py-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-16 text-center text-zinc-500">
              Carregando produtos...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-zinc-900">
                Nenhum produto encontrado
              </h2>

              <p className="mt-2 text-zinc-500">
                Tente buscar por outro nome.
              </p>
            </div>
          ) : (
            <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}