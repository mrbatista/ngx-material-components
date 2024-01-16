/** @docs-private */
export function createMissingTimeImplError(provider: string): Error {
  return Error(
    `MatTimeSelectComponent: No provider found for ${provider}. You must import one of the following ` +
      `modules at your application root: MatNativeTimeModule, MatMomentTimeModule, or provide a ` +
      `custom implementation.`,
  );
}
