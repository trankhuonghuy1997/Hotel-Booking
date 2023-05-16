const paginator = (items, page, per_page) => {
  const offset = (page - 1) * per_page;
  const paginatedItems = items.slice(offset).slice(0, per_page);
  const total_pages = Math.ceil(items.length / per_page);
  return {
    results: paginatedItems,
    page: page,
    total_pages: total_pages,
  };
};

module.exports = paginator;
