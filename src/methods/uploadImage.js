export default class MyUploadAdapter {
  constructor(loader) {
      // The file loader instance to use during the upload.
      this.loader = loader;
  }

  // Starts the upload process.
  upload() {
      return this.loader.file
          .then(file => new Promise((resolve, reject) => {
              this._initRequest();
              this._initListeners(resolve, reject, file);
              this._sendRequest(file);
          }));
  }

  // Aborts the upload process.
  abort() {
      if (this.xhr) {
          this.xhr.abort();
      }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)AdminToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
        
      const xhr = this.xhr = new XMLHttpRequest();

      // Use the specified upload URL.
      xhr.open('POST', 'https://vue3-course-api.hexschool.io/v2/api/uli01/admin/upload', true);
      xhr.setRequestHeader('Authorization', token);
      xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `Couldn't upload file: ${file.name}.`;

      xhr.addEventListener('error', () => reject(genericErrorText));
      xhr.addEventListener('abort', () => reject());
      xhr.addEventListener('load', () => {
          const response = xhr.response;

          if (!response || response.error) {
              return reject(response && response.error ? response.error.message : genericErrorText);
          }

          resolve({
              default: response.url
          });
      });

      if (xhr.upload) {
          xhr.upload.addEventListener('progress', evt => {
              if (evt.lengthComputable) {
                  loader.uploadTotal = evt.total;
                  loader.uploaded = evt.loaded;
              }
          });
      }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
      const data = new FormData();

      data.append('file-to-upload', file);

      this.xhr.send(data);
  }
}



