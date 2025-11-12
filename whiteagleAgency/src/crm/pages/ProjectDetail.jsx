import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, CircularProgress, Grid, Paper, Tab, Tabs, TextField, Typography, Alert, Stack, Divider, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../services/client';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [saving, setSaving] = useState(false);

  const [project, setProject] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', statusId: '', startDate: '', endDate: '', budget: '' });
  const [statuses, setStatuses] = useState([]);
  const [team, setTeam] = useState([]);
  const [allUserIds, setAllUserIds] = useState(''); // comma-separated ids for simplicity
  const [objectives, setObjectives] = useState([]);
  const [newObjective, setNewObjective] = useState({ projectId: Number(id), description: '', dueDate: '', isCompleted: false, priority: 1 });
  const [keyDates, setKeyDates] = useState([]);
  const [newKeyDate, setNewKeyDate] = useState({ projectId: Number(id), title: '', date: '', description: '' });

  const required = (v) => (v !== undefined && v !== null && String(v).trim() !== '');

  async function loadAll() {
    setLoading(true); setError('');
    try {
      const [data, st] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get('/status')
      ]);
      const p = data?.project || {};
      setProject(p);
      setForm({
        name: p.name || '',
        description: p.description || '',
        statusId: p.statusId || '',
        startDate: p.startDate || '',
        endDate: p.endDate || '',
        budget: p.budget ?? ''
      });
      setStatuses(st?.data || []);
      const t = await api.get(`/projects/${id}/team`);
      const teamList = t?.team || [];
      setTeam(teamList);
      setAllUserIds(teamList.map(u => u.id).join(','));
      const objs = await api.get(`/projects/${id}/objectives?projectId=${id}`);
      setObjectives(objs?.data?.records || objs?.rows || objs || []);
      const kd = await api.get(`/projects/${id}/key-dates?projectId=${id}`);
      setKeyDates(kd?.data?.records || kd?.rows || kd || []);
    } catch (e) {
      setError(e.message || 'Error al cargar el proyecto');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFormChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSaveDatos = async (e) => {
    e.preventDefault();
    setInfo(''); setError('');
    const fields = ['name','description','statusId','startDate','endDate','budget'];
    if (!fields.every((k) => required(form[k]))) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/projects/${id}`, { ...form, statusId: Number(form.statusId), budget: Number(form.budget) });
      setInfo('Proyecto actualizado correctamente');
      await loadAll();
    } catch (e) { setError(e.message || 'Error al guardar'); }
    finally { setSaving(false); }
  };

  const onUpdateTeam = async () => {
    setInfo(''); setError('');
    setSaving(true);
    try {
      const ids = allUserIds.split(',').map(s => s.trim()).filter(Boolean).map(Number);
      await api.post(`/projects/${id}/team`, { userIds: ids });
      setInfo('Equipo actualizado');
      await loadAll();
    } catch (e) { setError(e.message || 'Error al actualizar equipo'); }
    finally { setSaving(false); }
  };

  const onAddObjective = async (e) => {
    e.preventDefault(); setInfo(''); setError('');
    const fields = ['description','dueDate','priority'];
    if (!fields.every((k) => required(newObjective[k]))) { setError('Todos los campos del objetivo son obligatorios.'); return; }
    setSaving(true);
    try {
      await api.post(`/projects/${id}/objectives`, { ...newObjective, projectId: Number(id), priority: Number(newObjective.priority) });
      setNewObjective({ projectId: Number(id), description: '', dueDate: '', isCompleted: false, priority: 1 });
      setInfo('Objetivo agregado');
      await loadAll();
    } catch (e) { setError(e.message || 'Error al agregar objetivo'); }
    finally { setSaving(false); }
  };

  const onAddKeyDate = async (e) => {
    e.preventDefault(); setInfo(''); setError('');
    const fields = ['title','date'];
    if (!fields.every((k) => required(newKeyDate[k]))) { setError('Todos los campos de la fecha clave son obligatorios.'); return; }
    setSaving(true);
    try {
      await api.post(`/projects/${id}/key-dates`, { ...newKeyDate, projectId: Number(id) });
      setNewKeyDate({ projectId: Number(id), title: '', date: '', description: '' });
      setInfo('Fecha clave agregada');
      await loadAll();
    } catch (e) { setError(e.message || 'Error al agregar fecha'); }
    finally { setSaving(false); }
  };

  const onDeleteProject = async () => {
    if (!window.confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return;
    setInfo(''); setError(''); setSaving(true);
    try {
      await api.del(`/projects/${id}`);
      navigate('/crm/proyectos');
    } catch (e) { setError(e.message || 'Error al eliminar'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress size={24} /> <Typography>Cargando…</Typography>
    </Box>
  );

  if (!project) return <Typography sx={{ p: 3 }} color="error">Proyecto no encontrado</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="text" onClick={() => navigate(-1)}>← Volver</Button>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" gutterBottom>Proyecto #{project.id} – {project.name}</Typography>
        <Button color="error" onClick={onDeleteProject}>Eliminar</Button>
      </Stack>
      {(error || info) && (
        <Alert severity={error ? 'error' : 'success'} sx={{ mb: 2 }}>{error || info}</Alert>
      )}
      <Paper>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} aria-label="project tabs" variant="scrollable" allowScrollButtonsMobile>
          <Tab label="Datos" />
          <Tab label="Equipo" />
          <Tab label="Objetivos" />
          <Tab label="Fechas clave" />
        </Tabs>
        <Divider />
        <TabPanel value={tab} index={0}>
          <Box component="form" onSubmit={onSaveDatos}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Nombre" name="name" value={form.name} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}>
                <Select fullWidth size="small" name="statusId" value={form.statusId} onChange={(e)=>setForm(f=>({...f, statusId: e.target.value}))} displayEmpty required>
                  <MenuItem value=""><em>Selecciona un estado</em></MenuItem>
                  {statuses.map(s => (<MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>))}
                </Select>
              </Grid>
              <Grid item xs={12}><TextField label="Descripción" name="description" value={form.description} onChange={onFormChange} fullWidth required multiline minRows={3} /></Grid>
              <Grid item xs={12} sm={4}><TextField label="Inicio (YYYY-MM-DD)" name="startDate" value={form.startDate} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={4}><TextField label="Fin (YYYY-MM-DD)" name="endDate" value={form.endDate} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={4}><TextField label="Presupuesto" name="budget" type="number" value={form.budget} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Equipo actual</Typography>
            <Box sx={{ height: 300 }}>
              <DataGrid rows={team} columns={[
                { field: 'id', headerName: 'ID', width: 80 },
                { field: 'name', headerName: 'Nombre', flex: 1 },
                { field: 'surname', headerName: 'Apellido', flex: 1 },
                { field: 'email', headerName: 'Email', flex: 1.2 },
              ]} disableRowSelectionOnClick pageSizeOptions={[5,10]} initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }} />
            </Box>
            <Typography variant="subtitle2">Actualizar equipo (IDs separados por coma)</Typography>
            <TextField value={allUserIds} onChange={(e)=>setAllUserIds(e.target.value)} placeholder="e.g., 1,2,3" />
            <Button variant="contained" onClick={onUpdateTeam} disabled={saving}>Guardar equipo</Button>
          </Stack>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Typography variant="subtitle1" gutterBottom>Objetivos</Typography>
          <Box sx={{ height: 300, mb: 2 }}>
            <DataGrid rows={objectives} columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'description', headerName: 'Descripción', flex: 1.6 },
              { field: 'dueDate', headerName: 'Vence', width: 140 },
              { field: 'isCompleted', headerName: 'Hecho', width: 120 },
              { field: 'priority', headerName: 'Prioridad', width: 120 },
            ]} disableRowSelectionOnClick pageSizeOptions={[5,10]} initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }} />
          </Box>
          <Typography variant="subtitle2">Agregar objetivo</Typography>
          <Box component="form" onSubmit={onAddObjective}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}><TextField label="Descripción" value={newObjective.description} onChange={(e)=>setNewObjective({...newObjective, description: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={3}><TextField label="Vence (YYYY-MM-DD)" value={newObjective.dueDate} onChange={(e)=>setNewObjective({...newObjective, dueDate: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={2}><TextField label="Prioridad" type="number" value={newObjective.priority} onChange={(e)=>setNewObjective({...newObjective, priority: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}><Button type="submit" variant="contained" disabled={saving}>{saving ? 'Agregando…' : 'Agregar'}</Button></Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <Typography variant="subtitle1" gutterBottom>Fechas clave</Typography>
          <Box sx={{ height: 300, mb: 2 }}>
            <DataGrid rows={keyDates} columns={[
              { field: 'id', headerName: 'ID', width: 80 },
              { field: 'title', headerName: 'Título', flex: 1 },
              { field: 'date', headerName: 'Fecha', width: 160 },
              { field: 'description', headerName: 'Descripción', flex: 1.4 },
            ]} disableRowSelectionOnClick pageSizeOptions={[5,10]} initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }} />
          </Box>
          <Typography variant="subtitle2">Agregar fecha clave</Typography>
          <Box component="form" onSubmit={onAddKeyDate}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}><TextField label="Título" value={newKeyDate.title} onChange={(e)=>setNewKeyDate({...newKeyDate, title: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={4}><TextField label="Fecha (YYYY-MM-DD)" value={newKeyDate.date} onChange={(e)=>setNewKeyDate({...newKeyDate, date: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={4}><TextField label="Descripción" value={newKeyDate.description} onChange={(e)=>setNewKeyDate({...newKeyDate, description: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}><Button type="submit" variant="contained" disabled={saving}>{saving ? 'Agregando…' : 'Agregar'}</Button></Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}
