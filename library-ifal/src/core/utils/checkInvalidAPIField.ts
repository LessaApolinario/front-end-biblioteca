function checkInvalidAPIField<T>(field: T) {
  if (isInvalidField(field)) {
    return '-';
  }

  return field;
}

function isInvalidField<T>(field: T): boolean {
  return (
    isInvalidStringField(String(field)) || isInvalidNumberField(Number(field))
  );
}

function isInvalidStringField(field: string): boolean {
  return field === 'undefined';
}

function isInvalidNumberField(field: number): boolean {
  return isNaN(field);
}

export default checkInvalidAPIField;
