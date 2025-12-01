import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/client";
import Header from "../layout-crm/header";
import Footer from "../layout-crm/footer";
import CreateClientDialog from "./newClient";

export default function CRMClients() {
  const [userRole, setUserRole] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    companyName: "",
    contactEmail: "",
    statusId: "",
    industry: "",
  });
  const [allRows, setAllRows] = useState([]);
  const [error, setError] = useState("");

  // Datos auxiliares (Statuses)
  const [statuses, setStatuses] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  // --- Estado para controlar el Modal ---
  const [openDialog, setOpenDialog] = useState(false);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 60 },
      { field: "companyName", headerName: "Empresa", flex: 1, minWidth: 150 },
      { field: "cuit", headerName: "CUIT", width: 120 },
      { field: "contactEmail", headerName: "Email", flex: 1, minWidth: 180 },
      { field: "phone", headerName: "Teléfono", width: 130 },
      { field: "industry", headerName: "Industria", width: 130 },
      {
        field: "employeeCount",
        headerName: "Empl.",
        width: 80,
        type: "number",
      },
      {
        field: "statusId",
        headerName: "Estado",
        width: 130,
        renderCell: (params) => (
          <Chip size="small" label={statusMap[params.value] ?? "-"} />
        ),
      },
    ],
    [statusMap]
  );
  const addBtn = () => {
    if (userRole != 4)
      return (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Nuevo
        </Button>
      );
  };

  const searchFilters = () => {
    const companyFilter = filters.companyName?.toLowerCase() ?? "";
    const emailFilter = filters.contactEmail?.toLowerCase() ?? "";
    const statusFilter = filters.statusId ?? "";

    const filteredRows = allRows.filter((row) => {
      const name = row.companyName?.toLowerCase() ?? "";
      const email = row.contactEmail?.toLowerCase() ?? "";
      const status = row.statusId ?? "";

      const hasTextFilters = companyFilter || emailFilter;

      const matchesName = companyFilter
        ? name.startsWith(companyFilter)
        : false;

      const matchesEmail = emailFilter ? email === emailFilter : false;

      const matchesStatus = statusFilter ? status === statusFilter : true;

      if (!hasTextFilters) {
        return matchesStatus;
      }

      return (matchesName || matchesEmail) && matchesStatus;
    });

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    } else {
      setRows([]);
    }
  };

  async function fetchData(signal) {
    try {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v != null) qs.append(k, v);
      });
      const config = signal ? { signal } : {};
      const response = await api.get(`/clients?${qs.toString()}`, config);

      const list = Array.isArray(response["clients"])
        ? response["clients"]
        : Array.isArray(response.data)
        ? response.data
        : response.data?.rows || [];

      const roleUser = Number(response["userRole"]);
      setUserRole(roleUser);

      setRows(list);
      setAllRows(list);
      setError("");
    } catch (e) {
      if (e.name !== "CanceledError") {
        setError(e.message || "Error al cargar clientes");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStatuses() {
      try {
        const data = await api.get("/status", {
          signal: controller.signal,
        });

        // Normalización de respuesta (igual estilo que en projects)
        const list = Array.isArray(data?.data?.records)
          ? data.data.records
          : Array.isArray(data)
          ? data
          : data?.rows || data?.data || [];

        setStatuses(list);

        const map = {};
        list.forEach((s) => {
          if (s?.id != null) map[s.id] = s.name;
        });
        setStatusMap(map);
      } catch (e) {
        if (e.name === "CanceledError" || e.name === "AbortError") return;
        console.error("Error cargando estados", e);
        // opcional: setErrorEstados(...)
      }
    }

    fetchStatuses();
    fetchData(controller.signal);

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({
      companyName: "",
      contactEmail: "",
      statusId: "",
      industry: "",
    });
    setTimeout(() => fetchData(), 0);
  };
  const handleShowAll = () => {
    setFilters({
      companyName: "",
      contactEmail: "",
      statusId: "",
      industry: "",
    });
    setRows(allRows);
  };

  // Callback cuando se crea un cliente exitosamente
  const handleClientCreated = () => {
    fetchData(); // Recargamos la tabla
  };

  return (
    <>
      <Header />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Clientes
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <TextField
            label="Empresa"
            name="companyName"
            value={filters.companyName}
            onChange={handleChange}
            size="small"
          />
          <TextField
            label="Email"
            name="contactEmail"
            value={filters.contactEmail}
            onChange={handleChange}
            size="small"
          />
          <TextField
            select
            label="Estado"
            name="statusId"
            value={filters.statusId}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value=""></MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={searchFilters}>
            Filtrar
          </Button>
          <Button variant="text" onClick={handleReset}>
            Limpiar
          </Button>
          <IconButton onClick={handleShowAll} aria-label="recargar">
            <RefreshIcon />
          </IconButton>
          {addBtn()}
        </Stack>

        <Divider sx={{ my: 2 }} />
        {loading && <LinearProgress />}
        {error && (
          <Typography color="error" sx={{ my: 1 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ height: 520, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
          />
        </Box>
      </Box>

      <CreateClientDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={handleClientCreated}
        statuses={statuses}
      />
      <Footer />
    </>
  );
}
