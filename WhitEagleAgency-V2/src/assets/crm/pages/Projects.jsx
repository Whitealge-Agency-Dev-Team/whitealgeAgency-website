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
import { useNavigate } from "react-router-dom";

// Servicios y Componentes
import api from "../services/client";
import Header from "../layout-crm/header";
import Footer from "../layout-crm/footer";
import CreateProjectDialog from "./newProject"; // Asegúrate que la ruta sea correcta

export default function CRMProjects() {
  const navigate = useNavigate();

  // --- Estados de Datos ---
  const [rows, setRows] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [clients, setClients] = useState([]); // Nuevo: Para pasarlo al Dialog
  const [statusMap, setStatusMap] = useState({});

  // --- Estados de UI ---
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    statusId: "",
  });

  // --- Estado del Modal ---
  const [openDialog, setOpenDialog] = useState(false);

  // Definición de columnas
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 60 },
      // Nota: Tu backend anterior no tenía 'name', solo 'description'.
      // Si agregaste 'name' al modelo, déjalo aquí. Si no, esta columna saldrá vacía.
      {
        field: "description",
        headerName: "Descripción",
        flex: 1.5,
        minWidth: 220,
      },
      {
        field: "statusId",
        headerName: "Estado",
        width: 140,
        renderCell: (params) => (
          <Chip
            size="small"
            label={statusMap[params.value] ?? "Desconocido"}
            color="primary"
            variant="outlined"
          />
        ),
      },
      {
        field: "estimatedFinish",
        headerName: "Cierre Estimado",
        width: 140,
        valueFormatter: (params) => {
          if (!params.value) return "-";
          return new Date(params.value).toLocaleDateString();
        },
      },
      // Estas columnas dependen de si tu backend las devuelve o no
      {
        field: "createdAt",
        headerName: "Creado",
        width: 140,
        valueFormatter: (p) =>
          p.value ? new Date(p.value).toLocaleDateString() : "-",
      },
    ],
    [statusMap]
  );

  // --- Carga de Datos Principales (Proyectos) ---
  async function fetchData() {
    setError("");
    try {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v != null) qs.append(k, v);
      });

      const data = await api.get(`/projects?${qs.toString()}`);

      // Normalización de respuesta
      const list = Array.isArray(data?.data?.records)
        ? data.data.records
        : Array.isArray(data)
        ? data
        : data?.rows || data?.data || [];

      setRows(list);
    } catch (e) {
      console.error(e);
      setError(e.message || "Error al cargar proyectos");
    } finally {
      setLoading(false);
    }
  }

  // --- Carga de Dependencias (Status y Clientes) ---
  useEffect(() => {
    async function fetchDependencies() {
      try {
        // Ejecutamos ambas peticiones en paralelo para mayor velocidad
        const [statusRes, clientRes] = await Promise.all([
          api.get("/status").catch(() => []), // Si falla uno, no rompe el otro
          api.get("/clients").catch(() => []),
        ]);

        // Procesar Status
        const statusList = Array.isArray(statusRes)
          ? statusRes
          : statusRes?.data || [];
        setStatuses(statusList);

        const map = {};
        statusList.forEach((s) => {
          if (s?.id != null) map[s.id] = s.name;
        });
        setStatusMap(map);

        // Procesar Clientes
        const clientList = Array.isArray(clientRes)
          ? clientRes
          : clientRes?.data || clientRes?.rows || [];
        setClients(clientList);
      } catch (e) {
        console.error("Error cargando dependencias", e);
      }
    }

    fetchDependencies();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => fetchData();

  const handleReset = () => {
    setFilters({ name: "", description: "", statusId: "" });
    // Nota: fetchData usa el estado 'filters'. Al hacer setFilters,
    // fetchData usará el estado viejo en este ciclo si se llama inmediatamente.
    // Lo ideal es pasar los filtros limpios a fetchData o usar useEffect en filters.
    // Por simplicidad, recargamos la página o forzamos un refresh manual después.
    // Una solución rápida es recargar directamente aquí simulando el reset:
    window.location.reload();
  };

  const handleOpenNew = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box sx={{ p: 2 }}>
      <Header />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Proyectos</Typography>
      </Stack>

      {/* Filtros */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        {/* Nota: Si tu backend no filtra por nombre, este campo no hará nada */}
        <TextField
          label="Nombre/Desc"
          name="description"
          value={filters.description}
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
          sx={{ minWidth: 180 }}
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
        <Box sx={{ flexGrow: 1 }} /> {/* Espaciador */}
        <IconButton onClick={() => fetchData()} aria-label="recargar">
          <RefreshIcon />
        </IconButton>
        <Button
          variant="contained" // Cambiado a contained para resaltar la acción principal
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenNew}
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
          // Uso correcto de navegación SPA
          onRowClick={(params) => navigate(`/crm/proyectos/${params.id}`)}
        />
      </Box>

      {/* Integración del Nuevo Dialog */}
      <CreateProjectDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSuccess={async () => {
          // Refrescamos la tabla al crear uno nuevo exitosamente
          await fetchData();
        }}
        statuses={statuses}
        clients={clients}
      />
      <Footer />
    </Box>
  );
}
