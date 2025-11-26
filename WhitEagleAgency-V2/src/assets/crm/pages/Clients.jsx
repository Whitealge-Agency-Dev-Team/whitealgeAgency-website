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
  Toolbar,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/client";
import { useNavigate } from "react-router-dom";
import Header from "../layout-crm/header";
// Importamos el nuevo componente
import CreateClientDialog from "./newClient"; 

export default function CRMClients() {
  const navigate = useNavigate();

  // --- Estados de la Tabla ---
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    companyName: "",
    contactEmail: "",
    statusId: "",
    industry: "",
  });
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
      { field: "employeeCount", headerName: "Empl.", width: 80, type: "number" },
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

  // --- Carga de Datos ---
  async function fetchData(signal) {
    // Nota: Eliminamos setError("") al inicio para evitar parpadeos si es un refresh silencioso
    // pero si vienes de un error previo, es bueno limpiarlo.
    try {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v != null) qs.append(k, v);
      });
      const config = signal ? { signal } : {};
      const data = await api.get(`/clients?${qs.toString()}`, config);

      const list = Array.isArray(data?.data?.records)
        ? data.data.records
        : Array.isArray(data)
        ? data
        : data?.rows || [];
      setRows(list);
      setError(""); // Limpiamos error si la carga fue exitosa
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
        const data = await api.get("/status");
        const list = Array.isArray(data)
          ? data
          : data?.data?.records || data?.statuses || data?.rows || [];
        setStatuses(list);
        const map = {};
        list.forEach((s) => {
          if (s?.id != null) map[s.id] = s.name;
        });
        setStatusMap(map);
      } catch (e) {
        // ignore
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

  const handleApply = () => fetchData();
  const handleReset = () => {
    setFilters({ companyName: "", contactEmail: "", statusId: "", industry: "" });
    setTimeout(() => fetchData(), 0);
  };

  // Callback cuando se crea un cliente exitosamente
  const handleClientCreated = () => {
    fetchData(); // Recargamos la tabla
  };

  return (
    <>
      <Header />
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Clientes
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          {/* ... Filtros ... */}
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
            <MenuItem value="">Todos</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleApply}>
            Filtrar
          </Button>
          <Button variant="text" onClick={handleReset}>
            Limpiar
          </Button>
          <IconButton onClick={() => fetchData()} aria-label="recargar">
            <RefreshIcon />
          </IconButton>
          
          {/* Botón Nuevo: Solo cambia el estado true */}
          <Button 
            variant="outlined" 
            startIcon={<AddIcon />} 
            onClick={() => setOpenDialog(true)}
          >
            Nuevo
          </Button>
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
            onRowClick={(params) => navigate(`/crm/clientes/${params.id}`)}
          />
        </Box>
      </Box>

      {/* Renderizamos el componente hijo segmentado */}
      <CreateClientDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={handleClientCreated}
        statuses={statuses}
      />
    </>
  );
}