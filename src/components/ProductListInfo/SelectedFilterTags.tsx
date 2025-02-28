interface SelectedFilterTagsProps {
  selectedFilters: string[];
  onRemove: (filter: string) => void;
}

const SelectedFilterTags = ({
  selectedFilters,
  onRemove,
}: SelectedFilterTagsProps) => {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="relative bg-white border-t border-beige-tertiary mt-1">
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hidden p-2">
        {selectedFilters.map((filter) => (
          <span
            key={filter}
            className="inline-flex items-center px-3 py-1 bg-beige-primary text-brown-primary rounded-full text-sm mr-2"
          >
            {filter}
            <button onClick={() => onRemove(filter)} className="ml-1">
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SelectedFilterTags;
