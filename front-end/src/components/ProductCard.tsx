import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const inStock = product.quantity > 0;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-40 items-center justify-center bg-zinc-100">
        <span className="text-5xl font-bold text-zinc-300">
          {product.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            {product.name}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {inStock ? 'Em estoque' : 'Sem estoque'}
          </span>
        </div>

        <p className="mt-4 text-2xl font-bold text-zinc-900">
          R$ {product.price.toFixed(2)}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          {inStock
            ? `${product.quantity} unidades disponíveis`
            : 'Produto indisponível'}
        </p>
      </div>
    </article>
  );
}