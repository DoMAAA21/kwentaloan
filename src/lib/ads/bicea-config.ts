/** Third-party display unit from ad network (script + container id must stay paired). */
export const BICEA_AD_SCRIPT_SRC =
  "https://bicea.org/21/64a652bd9508c5d96edd42cf3049dc76";

export const BICEA_AD_CONTAINER_ID =
  "container-64a652bd9508c5d96edd42cf3049dc76";

export function isBiceaAdEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_BICEA_AD_ENABLED?.trim().toLowerCase();
  if (flag === "false" || flag === "0") {
    return false;
  }
  return true;
}
