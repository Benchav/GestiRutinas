interface ExerciseRow {
  id: string;
  orden: number;
  ejercicio: string;
  series: string;
  repeticiones: string;
  peso: string;
  descanso: string;
  notas: string;
  media?: string;
}

export const exportToCSV = (exercises: ExerciseRow[], routineTitle: string) => {
  const headers = [
    'Orden',
    'Ejercicio', 
    'Series',
    'Repeticiones',
    'Peso',
    'Descanso',
    'Notas'
  ];

  const csvContent = [
    headers.join(','),
    ...exercises.map(exercise => [
      exercise.orden,
      `"${exercise.ejercicio}"`,
      exercise.series,
      exercise.repeticiones,
      exercise.peso,
      exercise.descanso,
      `"${exercise.notas}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${routineTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_rutina.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToExcel = (exercises: ExerciseRow[], routineTitle: string) => {
  // Crear una tabla HTML que Excel puede interpretar
  const headers = ['Orden', 'Ejercicio', 'Series', 'Repeticiones', 'Peso', 'Descanso', 'Notas'];
  
  let htmlContent = `
    <table border="1">
      <thead>
        <tr style="background-color: #f0f0f0; font-weight: bold;">
          ${headers.map(header => `<th>${header}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${exercises.map(exercise => `
          <tr>
            <td>${exercise.orden}</td>
            <td>${exercise.ejercicio}</td>
            <td>${exercise.series}</td>
            <td>${exercise.repeticiones}</td>
            <td>${exercise.peso}</td>
            <td>${exercise.descanso}</td>
            <td>${exercise.notas}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const blob = new Blob([htmlContent], { 
    type: 'application/vnd.ms-excel;charset=utf-8;' 
  });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${routineTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_rutina.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};