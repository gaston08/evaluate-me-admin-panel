import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ExamContext } from 'app/contexts/Exam';
import { createExam, examType } from 'app/shared/interfaces/exam';

export default function ExamForm() {
  const { setExam, exam } = React.useContext<createExam>(ExamContext);

  const setCategory = (e: SelectChangeEvent) => {
    setExam((prev: examType) => {
      return {
        ...prev,
        category: e.target.value,
      };
    });
  };

  const setYear = (e: SelectChangeEvent) => {
    setExam((prev: examType) => {
      return {
        ...prev,
        year: e.target.value,
      };
    });
  };

  return (
    <Box sx={{ p: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="exam-year">Año</InputLabel>
        <Select
          labelId="exam-year"
          label="Año"
          onChange={setYear}
          value={exam.year}
        >
          <MenuItem value={2024}>2024</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="exam-category">Categoría</InputLabel>
        <Select
          labelId="exam-category"
          label="Categoría"
          onChange={setCategory}
          value={exam.category}
        >
          {categories.map((category) => {
            return (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
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
