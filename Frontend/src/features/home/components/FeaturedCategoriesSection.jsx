import { categories, products } from '../../../data'

const featuredCategories = categories.slice(0, 4).map((category) => ({
  ...category,
  items: `${products.filter((product) => product.category === category.name).length} items`,
}))

const FeaturedCategoriesSection = () => {
  return (
    <section className="px-3 py-6 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-350">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Shop by Category
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Find everything faster
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Browse daily needs by category.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className="group rounded-[24px] border border-emerald-100 bg-white p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-32 items-center justify-center rounded-[20px] bg-emerald-50">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-base font-black text-slate-900">
                {category.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {category.items}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategoriesSection;
