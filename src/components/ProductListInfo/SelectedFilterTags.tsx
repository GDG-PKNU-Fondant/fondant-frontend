interface SelectedFilterTagsProps {
  selectedFilters: Record<string, string[]>;
  onRemove: (category: string, filter: string) => void;
}

const SelectedFilterTags = ({
  selectedFilters,
  onRemove,
}: SelectedFilterTagsProps) => {
  if (Object.values(selectedFilters).every((filters) => filters.length === 0))
    return null;

  return (
    <div className="relative bg-white border-t border-beige-tertiary mt-1">
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden p-2">
        {Object.entries(selectedFilters).map(([category, filters]) =>
          filters.map((filter) => (
            <span
              key={`${category}-${filter}`}
              className="inline-flex items-center mx-0.5 px-3 py-1 bg-beige-primary text-brown-primary rounded-full text-sm"
            >
              {filter}
              <button
                type="button"
                onClick={() => onRemove(category, filter)}
                className="ml-1"
              >
                ✕
              </button>
            </span>
          )),
        )}
      </div>
    </div>
  );
};

export default SelectedFilterTags;
