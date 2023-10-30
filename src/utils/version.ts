export const getTitle = () => {
  return `${process.env.npm_package_name}`;
};

export const getVersion = () => {
  return `${process.env.npm_package_version || '0.0.0'}`;
};

export const getRevision = () => {
  let revision = 'DEBUG';
  if (process.env.NEXT_PUBLIC_SOURCE_VERSION) {
    revision = process.env.NEXT_PUBLIC_SOURCE_VERSION;
  }
  if (process.env.GITHUB_SHA) {
    revision = process.env.GITHUB_SHA;
  }
  if (process.env.CIRCLE_SHA1) {
    revision = process.env.CIRCLE_SHA1;
  }
  if (process.env.SOURCE_VERSION) {
    revision = process.env.SOURCE_VERSION;
  }

  const rev = revision.substring(0, 7).toUpperCase();
  return `${rev}`;
};

export const getVersionString = () => {
  return `${getTitle()} v${getVersion()}-#${getRevision()}`
}

export default getVersionString;
