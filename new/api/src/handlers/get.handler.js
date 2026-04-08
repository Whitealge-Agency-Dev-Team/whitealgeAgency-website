const get = async (
  Model,
  { limit = 50, page = 1, where = {}, order = [["id", "DESC"]] } = {},
) => {
  try {
    const rLimit = Math.min(Math.abs(parseInt(limit)) || 50, 100);
    const currentPage = Math.max(1, parseInt(page) || 1);
    const offset = (currentPage - 1) * rLimit;

    const rows = await Model.findAll({
      limit: rLimit + 1,
      offset,
      where,
      order,
    });

    const hasNext = rows.length > rLimit;
    if (hasNext) rows.pop();

    return {
      data: rows,
      pagination: {
        previousPage: currentPage > 1 ? currentPage - 1 : null,
        currentPage,
        nextPage: hasNext ? currentPage + 1 : null,
        totalItemsInPage: rows.length,
        itemsPerPage: rLimit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { get };
