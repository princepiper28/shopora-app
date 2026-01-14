import { motion } from "framer-motion";

const categories = [
  { name: "Electronics", emoji: "💻" },
  { name: "Fashion", emoji: "👕" },
  { name: "Jewelry", emoji: "💎" },
  { name: "Home", emoji: "🏠" },
  { name: "Sports", emoji: "🏀" },
];

interface CategoriesProps {
  onSelect: (category: string) => void;
  activeCategory: string;
}

export default function Categories() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-lg cursor-pointer"
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <p className="font-medium">{cat.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
