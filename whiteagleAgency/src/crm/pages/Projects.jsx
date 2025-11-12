import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, Divider, IconButton, LinearProgress, Stack, TextField, Typography, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/client';
import { useNavigate } from 'react-router-dom';

export default function CRMProjects() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '', description: '', statusId: '' });
  const [error, setError] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const columns = useMemo(() => ([
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Nombre', flex: 1, minWidth: 160 },
    { field: 'description', headerName: 'Descripción', flex: 1.5, minWidth: 220 },
    { field: 'statusId', headerName: 'Estado', width: 140, renderCell: (params) => <Chip size="small" label={statusMap[params.value] ?? '-'} /> },
    { field: 'startDate', headerName: 'Inicio', width: 140 },
    { field: 'endDate', headerName: 'Fin', width: 140 },
    { field: 'budget', headerName: 'Presupuesto', width: 140 },
  ]), [statusMap]);

  async function fetchData() {
    setLoading(true);
    setError('');
    try {
      const qs = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v !== '' && v != null) qs.append(k, v); });
      const data = await api.get(`/projects?${qs.toString()}`);
      const list = Array.isArray(data?.data?.records) ? data.data.records : (Array.isArray(data) ? data : data?.rows || []);
      setRows(list);
    } catch (e) {
      setError(e.message || 'Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchStatuses() {
      try {
        const data = await api.get('/status');
        const list = Array.isArray(data) ? data : (data?.data?.records || data?.statuses || data?.rows || []);
        setStatuses(list);
        const map = {};
        list.forEach((s) => { if (s?.id != null) map[s.id] = s.name; });
        setStatusMap(map);
      } catch (e) {
        // ignore errors for status load
      }
    }
    fetchStatuses();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => fetchData();
  const handleReset = () => { setFilters({ name: '', description: '', statusId: '' }); fetchData(); };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Proyectos</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'stretch', sm: 'center' }}>
        <TextField label="Nombre" name="name" value={filters.name} onChange={handleChange} size="small" />
        <TextField label="Descripción" name="description" value={filters.description} onChange={handleChange} size="small" />
        <TextField select label="Estado" name="statusId" value={filters.statusId} onChange={handleChange} size="small" sx={{ minWidth: 180 }}>
          <MenuItem value="">Todos</MenuItem>
          {statuses.map((s) => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleApply}>Filtrar</Button>
        <Button variant="text" onClick={handleReset}>Limpiar</Button>
        <IconButton onClick={() => fetchData()} aria-label="recargar"><RefreshIcon /></IconButton>
        <Button variant="outlined" startIcon={<AddIcon />}>Nuevo</Button>
      </Stack>
      <Divider sx={{ my: 2 }} />
      {loading && <LinearProgress />}
      {error && <Typography color="error" sx={{ my: 1 }}>{error}</Typography>}
      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          onRowClick={(params) => window.location.assign(`/crm/proyectos/${params.id}`)}
        />
      </Box>
    </Box>
  );
}
