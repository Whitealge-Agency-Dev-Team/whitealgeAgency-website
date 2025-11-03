const { Op } = require("sequelize");
const sequelizeError = require("./sequelizeErrorHandler");

const endpointCreate =  ({ model, columnNames = [], filters = [] }) => {
  return async (req, res) => {
    try {
      const toCreate = {};
      const modelColumns = await model.findOne();
      const realColumnNames = Object.keys(modelColumns);

      for (const column of columnNames) {
        if (!realColumnNames.includes(column)) continue;
        toCreate[column] = req.body[column];
      }

      const filteredFilters = filters.map((filter) => {
        if (realColumnNames.includes(filter)) return filter;
      });

      let newValue = await model.create(toCreate);
      if (filteredFilters > 0) {
        newValue = await model.findByPk(newValue.id, {
          attributes: filteredFilters,
        });
      }

      return res.status(201).json({
        success: true,
        data: {
          message: "Registro creado con éxito.",
          record: newValue,
        },
      });
    } catch (error) {
      sequelizeError(error, res);
    }
  };
};

const endpointDelete =  ({ model }) => {
  return async (req, res) => {
    try {
      const { id } = req.params;

      if (Number.isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "ID inválido.",
        });
      }

      await model.destroy({ where: { id } });

      return res.status(200).json({
        success: true,
        message: "Registro eliminado con éxito",
      });
    } catch (error) {
      sequelizeError(error, res);
    }
  };
};

const endpointUpdate =  ({ model, columnNames = [], filters = [] }) => {
  return async (req, res) => {
    try {
      const { id } = req.params;
      if (Number.isNaN(parseInt(id))) {
        return res.status(400).json({
          success: false,
          message: "ID inválido.",
        });
      }
      const toUpdate = {};
      const modelColumns = await model.findOne();
      const realColumnNames = Object.keys(modelColumns);

      for (const column of columnNames) {
        if (!realColumnNames.includes(column)) continue;
        toUpdate[column] = req.body[column];
      }

      const filteredFilters = filters.map((filter) => {
        if (realColumnNames.includes(filter)) return filter;
      });

      let newValue = await model.update(toUpdate, { where: { id } });
      if (filteredFilters > 0) {
        newValue = await model.findByPk(id, {
          attributes: filteredFilters,
        });
      }

      return res.status(201).json({
        success: true,
        data: {
          message: "Registro actualizado con éxito.",
          record: newValue,
        },
      });
    } catch (error) {
      sequelizeError(error, res);
    }
  };
};

const endpointSearch = ({
  model,
  filters = [],
  page = 1,
  limit = 30,
}) => {
  return async (req, res) => {
    try {
      const {
        query,
        page: queryPage,
        limit: queryLimit,
        ...filterParams
      } = req.query;

      const currentPage = parseInt(queryPage) || page;
      const currentLimit = parseInt(queryLimit) || limit;
      const offset = (currentPage - 1) * currentLimit;

      const modelColumns = await model.findOne();
      if (!modelColumns)
        return res.status(404).json({ error: "Modelo no encontrado" });

      const realColumnNames = Object.keys(
        modelColumns.toJSON ? modelColumns.toJSON() : modelColumns
      );

      const whereClause = {};
      filters.forEach((filter) => {
        if (realColumnNames.includes(filter.field) && req.query[filter.field]) {
          switch (filter.type) {
            case "int":
              whereClause[filter.field] = parseInt(req.query[filter.field]);
              break;
            case "float":
            case "decimal":
              whereClause[filter.field] = parseFloat(req.query[filter.field]);
              break;
            case "boolean":
              whereClause[filter.field] = req.query[filter.field] === "true";
              break;
            case "date":
              whereClause[filter.field] = new Date(req.query[filter.field]);
              break;
            case "string":
            default:
              whereClause[filter.field] = {
                [Op.like]: `%${req.query[filter.field]}%`,
              };
              break;
          }
        }
      });

      Object.keys(filterParams).forEach((key) => {
        if (
          realColumnNames.includes(key) &&
          !filters.some((f) => f.field === key)
        ) {
          const value = filterParams[key];
          if (!isNaN(value) && value !== "") whereClause[key] = Number(value);
          else if (
            value.toLowerCase() === "true" ||
            value.toLowerCase() === "false"
          )
            whereClause[key] = value.toLowerCase() === "true";
          else whereClause[key] = { [Op.like]: `%${value}%` };
        }
      });

      if (query) {
        const searchConditions = realColumnNames.map((column) => ({
          [column]: { [Op.like]: `%${query}%` },
        }));
        whereClause[Op.or] = searchConditions;
      }

      const result = await model.findAndCountAll({
        where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
        limit: currentLimit,
        offset: offset,
        order: [["createdAt", "DESC"]],
      });

      const totalPages = Math.ceil(result.count / currentLimit);

      res.status(200).json({
        success: true,
        data: result.rows,
        pagination: {
          currentPage: currentPage,
          totalPages: totalPages,
          totalItems: result.count,
          itemsPerPage: currentLimit,
          hasNext: currentPage < totalPages,
          hasPrev: currentPage > 1,
        },
      });
    } catch (error) {
      sequelizeError(error, res);
    }
  };
};

module.exports = {endpointCreate, endpointDelete, endpointSearch, endpointUpdate}