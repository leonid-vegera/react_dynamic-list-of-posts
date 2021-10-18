const BASE_URL = 'https://mate.academy/students-api';

export const request = (url, options) => (
  fetch(`${BASE_URL}/${url}`, options)
    .then((response) => {
      if (!response.ok) {
        return new Error(`Error - ${response.status}`);
      }

      return response.json();
    })
);
