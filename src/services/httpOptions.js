const _getCredentialOptions = (withAuth) => {
  return withAuth
    ? {
        withCredentials: true,
      }
    : {};
};

const _getContentOptions = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

const _getHeaderOptions = () => {
  return {
    headers: {
      ..._getContentOptions(),
    },
  };
};

export const httpOptions = {
  get: (method, withAuth = true, content) => ({
    method,
    ..._getHeaderOptions(withAuth, content),
    ..._getCredentialOptions(withAuth),
  }),
  getContentOptionsJSON: () => ({
    Accept: "application/json",
    "Content-Type": "application/json",
  }),
};
