export const ADMIN_UIDS = ["zgPHzIrEi4ZvBesjqt5XUkiCoju2"];

export function isAdminUid(uid: string | undefined | null) {
  if (!uid) return false;
  return ADMIN_UIDS.includes(uid);
}
