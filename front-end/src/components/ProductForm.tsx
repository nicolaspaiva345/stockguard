import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../services/api';
import type { Product } from '../types/Product';

interface ProductFormProps {
  product?: Product;
  onProductCreated: () => void;
  onProductUpdated: () => void;
  onCancelEdit: () => void;
}

export function ProductForm({
  product,
  onProductCreated,
  onProductUpdated,
  onCancelEdit,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [quantity, setQuantity] = useState(
    product ? String(product.quantity) : ''
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setName(product?.name ?? '');
    setPrice(product ? String(product.price) : '');
    setQuantity(product ? String(product.quantity) : '');
    setError('');
    setSuccess('');
  }, [product]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    const data = {
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      if (product) {
        await api.put(`/products/${product.id}`, data);

        setSuccess('Produto atualizado com sucesso.');

        onProductUpdated();
      } else {
        await api.post('/products', data);

        setName('');
        setPrice('');
        setQuantity('');

        setSuccess('Produto cadastrado com sucesso.');

        onProductCreated();
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error);

      setError(
        'Não foi possível salvar o produto. Verifique os dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold text-zinc-900">
        {product ? 'Editar produto' : 'Novo produto'}
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        {product
          ? 'Atualize as informações do produto.'
          : 'Cadastre um novo produto no estoque.'}
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
          {success}
        </p>
      )}

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          required
          disabled={loading}
        />

        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="Preço"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          required
          disabled={loading}
        />

        <input
          type="number"
          min="0"
          placeholder="Quantidade"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-zinc-900"
          required
          disabled={loading}
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? 'Salvando...'
            : product
              ? 'Salvar alterações'
              : 'Cadastrar produto'}
        </button>

        {product && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={loading}
            className="rounded-lg border border-zinc-300 px-5 py-3 font-medium text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}