import axios from 'axios';

export async function zipDownload({
  apiUrl,
  fileName,
}: {
  apiUrl: string
  fileName?: string
}) {
  const data = await axios.get(`http://localhost:8000/${apiUrl}`, { responseType: 'blob' });

  const url = window.URL.createObjectURL(new Blob([data.data]));
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName ?? 'results.zip';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
