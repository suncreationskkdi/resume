export function exportAsHTML() {
  const resumeContent = document.getElementById('resume-content');
  if (!resumeContent) {
    alert('Resume content not found');
    return;
  }

  const styles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.5;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    </style>
  `;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  ${styles}
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${resumeContent.outerHTML}
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function printResume() {
  const resumeContent = document.getElementById('resume-content');
  if (!resumeContent) {
    alert('Resume content not found');
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups to print the resume');
    return;
  }

  const styles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.5;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        @page {
          margin: 0;
          size: letter;
        }
      }
    </style>
  `;

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Resume</title>
  ${styles}
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  ${resumeContent.outerHTML}
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `);

  printWindow.document.close();
}
