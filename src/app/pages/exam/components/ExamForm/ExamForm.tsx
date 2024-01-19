import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ExamForm() {
  return (
    <Box sx={{ p: 1 }}>
      <TextField
        label="Nombre del exámen"
        variant="outlined"
        placeholder="Por ej: ALGEBRA 1 UBA XXI"
        fullWidth
      />
      <Autocomplete
        disablePortal
        options={categories}
        sx={{ width: 300, mt: 1 }}
        renderInput={(params) => <TextField {...params} label="Categoria" />}
        fullWidth
      />
    </Box>
  );
}

const categories = [
  { label: 'ÁLGEBRA', value: 'ÁLGEBRA' },
  { label: 'ANÁLISIS MATEMÁTICO', value: 'ANÁLISIS MATEMÁTICO' },
  {
    label: 'ANÁLISIS MATEMÁTICO PARA CS. ECONÓMICAS',
    value: 'ANÁLISIS MATEMÁTICO PARA CS. ECONÓMICAS',
  },
  { label: 'ANTROPOLOGÍA', value: 'ANTROPOLOGÍA' },
  { label: 'BIOFÍSICA', value: 'BIOFÍSICA' },
  { label: 'BIOLOGÍA', value: 'BIOLOGÍA' },
  { label: 'BIOLOGÍA CELULAR', value: 'BIOLOGÍA CELULAR' },
  { label: 'CIENCIAS POLÍTICAS', value: 'CIENCIAS POLÍTICAS' },
  {
    label: 'DERECHOS HUMANOS Y DERECHO CONSTITUCIONAL',
    value: 'DERECHOS HUMANOS Y DERECHO CONSTITUCIONAL',
  },
  { label: 'ECONOMÍA', value: 'ECONOMÍA' },
  { label: 'FILOSOFÍA', value: 'FILOSOFÍA' },
  { label: 'FÍSICA', value: 'FÍSICA' },
  {
    label: 'HISTORIA ECONÓMICA SOCIAL Y GENERAL',
    value: 'HISTORIA ECONÓMICA SOCIAL Y GENERAL',
  },
  { label: 'MATEMÁTICA', value: 'MATEMÁTICA' },
  { label: 'MATEMÁTICA PARA AGRONOMÍA', value: 'MATEMÁTICA PARA AGRONOMÍA' },
  { label: 'PENSAMIENTO CIENTÍFICO', value: 'PENSAMIENTO CIENTÍFICO' },
  { label: 'PENSAMIENTO COMPUTACIONAL', value: 'PENSAMIENTO COMPUTACIONAL' },
  {
    label: 'PRINCIPIOS GENERALES DE DERECHO PRIVADO',
    value: 'PRINCIPIOS GENERALES DE DERECHO PRIVADO',
  },
  { label: 'PSICOLOGÍA', value: 'PSICOLOGÍA' },
  { label: 'QUÍMICA', value: 'QUÍMICA' },
  { label: 'SEMIOLOGÍA', value: 'SEMIOLOGÍA' },
  { label: 'SOCIEDAD Y ESTADO', value: 'SOCIEDAD Y ESTADO' },
  { label: 'SOCIOLOGÍA', value: 'SOCIOLOGÍA' },
  { label: 'TRABAJO Y SOCIEDAD', value: 'TRABAJO Y SOCIEDAD' },
];
