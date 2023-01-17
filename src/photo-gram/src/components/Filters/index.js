import FilterItem from "../FilterItem";
import "./index.css";

function Filters({ category, setCategory, sortBy, setSortBy, setCurrentPage }) {
    const categories = [
        "fashion",
        "nature",
        "science",
        "education",
        "feelings",
        "health",
        "religion",
        "places",
        "animals",
        "industry",
        "food",
        "sports",
        "transportation",
        "travel",
        "buildings",
        "business",
        "music",
        "all",
    ]
        .map((item) => {
            if (item === "all") return { value: "", label: "ALL" };
            return { value: item, label: item.toUpperCase() };
        })
        .sort((a, b) => a.label.localeCompare(b.label));

    const sortType = [
        { value: "popular", label: "POPULARITY" },
        { value: "latest", label: "DATE" },
    ];

    return (
        <div className='filters'>
            <div className='filter'>
                <label className='filter__header'>Category:</label>
                <FilterItem
                    options={categories}
                    value={category}
                    setValue={setCategory}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className='filter'>
                <label className='filter__header'>Sort by:</label>
                <FilterItem
                    options={sortType}
                    value={sortBy}
                    setValue={setSortBy}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default Filters;
