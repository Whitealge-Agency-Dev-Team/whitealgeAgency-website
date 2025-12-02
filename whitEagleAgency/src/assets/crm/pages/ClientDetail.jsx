import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, CircularProgress, Grid, Paper, Tab, Tabs, TextField, Typography, Alert, Stack, Divider, Select, MenuItem } from '@mui/material';
import api from '../services/client';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [client, setClient] = useState(null);
  const [form, setForm] = useState({ companyName: '', contactEmail: '', phone: '', problemDescription: '', industry: '' });
  const [statusId, setStatusId] = useState('');
  const [representatives, setRepresentatives] = useState([]);
  const [newRep, setNewRep] = useState({ name: '', email: '', phone: '', position: '' });
  const [projects, setProjects] = useState([]);
  const [info, setInfo] = useState('');
  const [statuses, setStatuses] = useState([]);
  const statusById = (id) => statuses.find(s => s.id === Number(id));

  const required = (v) => (v !== undefined && v !== null && String(v).trim() !== '');

  async function loadAll() {
    setLoading(true);
    setError('');
    try {
      const [data, st] = await Promise.all([
        api.get(`/clients/${id}`),
        api.get('/status')
      ]);
      const c = data?.client || {};
      setClient(c);
      setForm({
        companyName: c.companyName || '',
        contactEmail: c.contactEmail || '',
        phone: c.phone || '',
        problemDescription: c.problemDescription || '',
        industry: c.industry || ''
      });
      setStatuses(st?.data || []);
      setStatusId(c.statusId || '');
      const reps = await api.get(`/clients/${id}/representatives?clientId=${id}`);
      setRepresentatives(reps?.data?.records || reps?.rows || reps || []);
      const projs = await api.get(`/clients/${id}/projects`);
      setProjects(projs?.projects || []);
    } catch (e) {
      setError(e.message || 'Error al cargar el cliente');
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
    // Validar todos los campos obligatorios
    const fields = ['companyName','contactEmail','phone','problemDescription','industry'];
    if (!fields.every((k) => required(form[k]))) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setSaving(true);
    try {
      await api.put(`/clients/${id}`, { ...form, statusId: client?.statusId });
      setInfo('Datos actualizados correctamente');
      await loadAll();
    } catch (e) {
      setError(e.message || 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const onSaveStatus = async () => {
    setInfo(''); setError('');
    if (!required(statusId)) { setError('El estado es obligatorio'); return; }
    setSaving(true);
    try {
      await api.put(`/clients/${id}/status`, { statusId: Number(statusId) });
      setInfo('Estado actualizado');
      await loadAll();
    } catch (e) {
      setError(e.message || 'Error al actualizar estado');
    } finally { setSaving(false); }
  };

  const onAddRep = async (e) => {
    e.preventDefault();
    setInfo(''); setError('');
    const fields = ['name','email','phone','position'];
    if (!fields.every((k) => required(newRep[k]))) {
      setError('Todos los campos del representante son obligatorios.');
      return;
    }
    setSaving(true);
    try {
      await api.post(`/clients/${id}/representatives`, { ...newRep, clientId: Number(id) });
      setNewRep({ name: '', email: '', phone: '', position: '' });
      setInfo('Representante agregado');
      await loadAll();
    } catch (e) {
      setError(e.message || 'Error al agregar representante');
    } finally { setSaving(false); }
  };

  if (loading) return (
    <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <CircularProgress size={24} /> <Typography>Cargando…</Typography>
    </Box>
  );

  if (!client) return <Typography sx={{ p: 3 }} color="error">Cliente no encontrado</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="text" onClick={() => navigate(-1)}>← Volver</Button>
      <Typography variant="h5" gutterBottom>Cliente #{client.id} – {client.companyName}</Typography>
      {(error || info) && (
        <Alert severity={error ? 'error' : 'success'} sx={{ mb: 2 }}>{error || info}</Alert>
      )}
      <Paper>
        <Tabs value={tab} onChange={(_e, v) => setTab(v)} aria-label="client tabs" variant="scrollable" allowScrollButtonsMobile>
          <Tab label="Datos" />
          <Tab label="Estado" />
          <Tab label="Representantes" />
          <Tab label="Proyectos" />
        </Tabs>
        <Divider />
        <TabPanel value={tab} index={0}>
          <Box component="form" onSubmit={onSaveDatos}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Empresa" name="companyName" value={form.companyName} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Email de contacto" name="contactEmail" type="email" value={form.contactEmail} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Teléfono" name="phone" value={form.phone} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Industria" name="industry" value={form.industry} onChange={onFormChange} fullWidth required /></Grid>
              <Grid item xs={12}><TextField label="Problemática" name="problemDescription" value={form.problemDescription} onChange={onFormChange} fullWidth required multiline minRows={3} /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={'center'}>
            <Select size="small" value={statusId} onChange={(e)=>setStatusId(e.target.value)} displayEmpty>
              <MenuItem value=""><em>Selecciona un estado</em></MenuItem>
              {statuses.map(s => (<MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>))}
            </Select>
            <Chip label={`Actual: ${statusById(client.statusId)?.name || '-'}`} />
            <Button variant="contained" onClick={onSaveStatus} disabled={saving}>Actualizar estado</Button>
          </Stack>

          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" gutterBottom>Registrar cliente (tras aceptar problemática)</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Requiere que el estado sea "en curso". Se enviará un link de set-password por consola en entorno dev.</Typography>
          <Box component="form" onSubmit={async (e)=>{
            e.preventDefault();
            setError(''); setInfo('');
            const fd = new FormData(e.currentTarget);
            const payload = {
              email: fd.get('reg_email')?.toString() || '',
              name: fd.get('reg_name')?.toString() || '',
              surname: fd.get('reg_surname')?.toString() || '',
              clientId: Number(id)
            };
            if (!payload.email || !payload.name || !payload.surname){ setError('Todos los campos de registro son obligatorios.'); return; }
            // comprobar que el estado seleccionado o actual sea "en curso"
            const current = statusById(statusId || client.statusId)?.name?.toLowerCase?.() || '';
            if (current !== 'en curso') { setError('El estado debe ser "en curso" para registrar al cliente.'); return; }
            try {
              const res = await api.post('/auth/register-client', payload);
              setInfo(res?.message || 'Cliente registrado (ver consola del servidor para el link)');
              e.currentTarget.reset();
            } catch (er) { setError(er.message || 'Error al registrar cliente'); }
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}><TextField name="reg_email" label="Correo del cliente" type="email" required fullWidth /></Grid>
              <Grid item xs={12} sm={4}><TextField name="reg_name" label="Nombre" required fullWidth /></Grid>
              <Grid item xs={12} sm={4}><TextField name="reg_surname" label="Apellido" required fullWidth /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button type="submit" variant="outlined">Registrar cliente</Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Typography variant="subtitle1" gutterBottom>Listado</Typography>
          {representatives?.length === 0 ? <Typography>No hay representantes cargados</Typography> : (
            <Stack spacing={1} sx={{ mb: 2 }}>
              {representatives.map((r) => (
                <Paper key={r.id} sx={{ p: 1.5 }}>
                  <Typography><b>{r.name}</b> – {r.email} – {r.phone} – {r.position}</Typography>
                </Paper>
              ))}
            </Stack>
          )}
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1">Agregar representante</Typography>
          <Box component="form" onSubmit={onAddRep}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Nombre" value={newRep.name} onChange={(e)=>setNewRep({...newRep, name: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Email" type="email" value={newRep.email} onChange={(e)=>setNewRep({...newRep, email: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Teléfono" value={newRep.phone} onChange={(e)=>setNewRep({...newRep, phone: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Cargo/Posición" value={newRep.position} onChange={(e)=>setNewRep({...newRep, position: e.target.value})} fullWidth required /></Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}><Button type="submit" variant="contained" disabled={saving}>{saving ? 'Agregando…' : 'Agregar'}</Button></Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          {projects?.length === 0 ? <Typography>No hay proyectos asociados.</Typography> : (
            <Stack spacing={1}>
              {projects.map((p) => (
                <Paper key={p.id} sx={{ p: 1.5, cursor: 'pointer' }} onClick={() => navigate(`/crm/proyectos/${p.id}`)}>
                  <Typography><b>{p.name}</b> – Estado: <Chip size="small" label={p.statusId ?? '-'} /></Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </TabPanel>
      </Paper>
    </Box>
  );
}
