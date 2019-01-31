const xhr = (method, url, data = null) => {
  return new window.Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.timeout = 10000;
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          let response = xhr.response;
          const type = xhr.getResponseHeader('Content-Type');
          if (type.indexOf('css') > -1) {
            var blob = new Blob([response], { type });
            var csvUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = csvUrl;
            link.download = 'style.css';
            link.click();
            resolve(response);
            return;
          }
          try {
            response = JSON.parse(xhr.response);
          } catch (e) {}
          resolve(response);
        } else {
          reject(xhr.statusText);
        }
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    xhr.ontimeout = () => {
      xhr.abort();
      reject('timeout');
    };
    xhr.send(JSON.stringify(data));
  });
};

export const post = (url, data) => {
  return xhr('POST', url, data);
};

export const get = (url) => {
  return xhr('GET', url);
};
