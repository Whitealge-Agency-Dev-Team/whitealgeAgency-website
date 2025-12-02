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
import CreateProjectDialog from "./newProject";
import ProjectTeamDialog from "./ProjectDetail";

export default function CRMProjects() {
  const [userRole, setUserRole] = useState(null);
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [clients, setClients] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamUserIds, setTeamUserIds] = useState([]);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    statusId: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 60 },
      {
        field: "title",
        headerName: "Nombre",
        flex: 1.5,
        minWidth: 220,
      },
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
          if (!params) return "-";
          return new Date(params).toLocaleDateString();
        },
      },
      {
        field: "createdAt",
        headerName: "Creado",
        width: 140,
        valueFormatter: (p) => (p ? new Date(p).toLocaleDateString() : "-"),
      },
    ],
    [statusMap]
  );
  const addButton = () => {
    if (userRole != 4 && userRole != 5)
      return (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenNew}
        >
          Nuevo
        </Button>
      );
  };
  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== "" && v != null) qs.append(k, v);
      });

      const data = await api.get(`/projects?${qs.toString()}`);

      const list = Array.isArray(data["projects"])
        ? data["projects"]
        : Array.isArray(data.data)
        ? data.data
        : data.data?.rows || [];
      setUserRole(Number(data["userRole"]));
      setRows(list);
      setAllRows(list);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const searchFilters = () => {
    const descriptionFilters = Array.isArray(filters.description)
      ? filters.description.map((s) => s?.toLowerCase().trim()).filter(Boolean)
      : [];

    const statusFilter = filters.statusId ?? "";

    const filteredRows = allRows.filter((row) => {
      const description = row.description?.toLowerCase() ?? "";
      const status = row.statusId ?? "";

      const hasTextFilters = descriptionFilters.length > 0;

      const matchesDescription = hasTextFilters
        ? descriptionFilters.some((term) => description.startsWith(term))
        : false;

      const matchesStatus = statusFilter ? status === statusFilter : true;

      if (!hasTextFilters) {
        return matchesStatus;
      }

      return matchesDescription && matchesStatus;
    });

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    } else {
      setRows([]);
    }
  };

  useEffect(() => {
    async function fetchDependencies() {
      try {
        const [statusRes, clientRes] = await Promise.all([
          api.get("/status").catch(() => []),
          api.get("/clients").catch(() => []),
        ]);

        const statusList = Array.isArray(statusRes)
          ? statusRes
          : statusRes?.data || [];
        setStatuses(statusList);

        const map = {};
        statusList.forEach((s) => {
          if (s?.id != null) map[s.id] = s.name;
        });
        setStatusMap(map);

        const clientList = Array.isArray(clientRes["clients"])
          ? clientRes
          : clientRes?.data || clientRes?.rows || [];
        setClients(clientList);
      } catch (e) {
        console.error("Error cargando dependencias", e);
      }
    }

    fetchDependencies();
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRowClick = async (params) => {
    const project = params.row;
    setSelectedProject(project);
    setTeamDialogOpen(true);
  };

  const handleApply = () => searchFilters();

  const handleReset = () => {
    setFilters({ name: "", description: "", statusId: "" });
    setRows(allRows);
  };

  const handleReload = () => {
    fetchData();
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

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <TextField
          label="Nombre"
          name="name"
          value={filters.name}
          onChange={handleChange}
          size="small"
        />
        <TextField
          label="Descripción"
          name="description"
          value={filters.description}
          onChange={handleChange}
          size="small"
        />
        <TextField
          select
          label="Estados"
          name="statusId"
          value={filters.statusId}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value=""></MenuItem>
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
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleReload} aria-label="recargar">
          <RefreshIcon />
        </IconButton>
        {addButton()}
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
          onRowClick={handleRowClick}
        />
      </Box>

      <CreateProjectDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSuccess={async () => {
          await fetchData();
        }}
        statuses={statuses}
        clients={clients}
      />
      <ProjectTeamDialog
        open={teamDialogOpen}
        onClose={() => setTeamDialogOpen(false)}
        project={selectedProject}
        userRole={userRole}
        initialUserIds={teamUserIds}
        
      />
      <Footer />
    </Box>
  );
}
