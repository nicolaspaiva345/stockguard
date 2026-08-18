import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Product } from '../types/Product';
import { ProductForm } from '../components/ProductForm';
import { Navbar } from '../components/NavBar';

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
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

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este produto?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      setError('Não foi possível excluir o produto.');
    }
  }

  async function handleProductUpdated() {
    await loadProducts();
    setEditingProduct(undefined);
  }

  function handleCancelEdit() {
    setEditingProduct(undefined);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-100 px-6 py-10">
        <div className="mx-auto max-w-6xl">

          <header className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-900">
              Painel Administrativo
            </h1>

            <p className="mt-2 text-zinc-500">
              Gerencie os produtos do estoque.
            </p>
          </header>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <ProductForm
            product={editingProduct}
            onProductCreated={loadProducts}
            onProductUpdated={handleProductUpdated}
            onCancelEdit={handleCancelEdit}
          />

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="border-b border-zinc-200 bg-zinc-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                      Produto
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                      Preço
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                      Estoque
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-10 text-center text-zinc-500"
                      >
                        Carregando produtos...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-10 text-center text-zinc-500"
                      >
                        Nenhum produto cadastrado.
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-zinc-100 last:border-b-0"
                      >
                        <td className="px-6 py-4 font-medium text-zinc-900">
                          {product.name}
                        </td>

                        <td className="px-6 py-4 text-zinc-700">
                          R$ {product.price.toFixed(2)}
                        </td>

                        <td className="px-6 py-4 text-zinc-700">
                          {product.quantity}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="mr-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}