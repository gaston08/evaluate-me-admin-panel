import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { ExamContext } from 'app/contexts/Exam';
import { createExam, examType } from 'app/shared/interfaces/exam';
import {
  categories,
  years,
  exam_types,
  exam_numbers,
} from 'app/shared/data/exam';

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

  const setType = (e: SelectChangeEvent) => {
    setExam((prev: examType) => {
      return {
        ...prev,
        type: e.target.value,
      };
    });
  };

  const setExamNumber = (e: SelectChangeEvent) => {
    setExam((prev: examType) => {
      return {
        ...prev,
        exam_number: e.target.value,
      };
    });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Accordion sx={{ backgroundColor: 'white', border: 'none' }}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          Información del Exámen.
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth>
            <InputLabel id="exam-year">Año</InputLabel>
            <Select
              labelId="exam-year"
              label="Año"
              onChange={setYear}
              value={exam.year}
            >
              {years.map((year) => {
                return (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
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

          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="exam-type">Tipo</InputLabel>
            <Select
              labelId="exam-type"
              label="Tipo"
              onChange={setType}
              value={exam.type}
            >
              {exam_types.map((exam_type) => {
                return (
                  <MenuItem key={exam_type} value={exam_type}>
                    {exam_type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="exam-number">Tema</InputLabel>
            <Select
              labelId="exam-number"
              label="Tema"
              onChange={setExamNumber}
              value={exam.exam_number}
            >
              {exam_numbers.map((exam_number) => {
                return (
                  <MenuItem key={exam_number} value={exam_number}>
                    {exam_number}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
