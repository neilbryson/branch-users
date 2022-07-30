export function buildFullName(firstName: string, middleName: string, lastName: string): string {
  return `${firstName} ${middleName.charAt(0)}. ${lastName}`;
}
