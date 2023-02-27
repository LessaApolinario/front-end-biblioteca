function checkForInvalidString(field?: string): string {
  if (isInvalid(field)) {
    return '-';
  }

  return field as string;
}

function isInvalid(field?: string) {
  return !field || field === 'undefined';
}

export default checkForInvalidString;
