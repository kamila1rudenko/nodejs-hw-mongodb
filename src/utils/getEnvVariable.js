export function getEnvVariable(name) {
  const value = process.env[name];
  if (typeof value === 'undefined' || value === '') {
    throw new Error(`Cannot read variable ${name}`);
  }
  return value;
}
