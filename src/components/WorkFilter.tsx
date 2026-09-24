const categories = [
  'Brand & Identity',
  'User Research',
  'UI/UX Design',
  'Strategy',
  'Responsive Web Design',
  'Product Design',
  'Content',
  'Copywriting',
  'AI Systems',
  'Digital Campaigns',
  'Social Media Marketing',
  'SEO',
  'E-commerce',
  'Development',
  'Animation & Motion',
]

interface WorkFilterProps {
  query: string
  onQueryChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
}

export function WorkFilter({ query, onQueryChange, category, onCategoryChange }: WorkFilterProps) {
  return (
    <div className="work-filter">
      <div className="work-filter__search-wrap">
        <svg
          className="work-filter__search-icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="work-filter__search"
          placeholder="Project Name"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search projects by name"
        />
      </div>
      <select
        className="work-filter__category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter projects by category"
      >
        <option value="__all__">Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  )
}
