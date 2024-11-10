function addDownloadLink() {
  const downloadLink = document.createElement('a');
  downloadLink.href = '/swagger-spec.json';
  downloadLink.download = 'nestjs_base_api_spec.json';
  downloadLink.innerText = 'Download API JSON';

  const descriptionElement = document.querySelector(
    '.swagger-ui .info .description',
  );
  if (descriptionElement) {
    descriptionElement.appendChild(downloadLink);
  }
}

// Use MutationObserver to detect when the Swagger UI has finished rendering
const observer = new MutationObserver((mutations, obs) => {
  const descriptionElement = document.querySelector(
    '.swagger-ui .info .description',
  );
  if (descriptionElement) {
    addDownloadLink();
    obs.disconnect(); // Stop observing once the link is added
  }
});

// Start observing the document for changes
observer.observe(document, {
  childList: true,
  subtree: true,
});
